"use client"

import { useNavigate } from "react-router"
import API from "../../api/api"
import { useEffect, useState, useRef } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

// Register chart elements
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const Card = () => {
  const [pendingCount, setPendingCount] = useState(0)
  const [resolvedCount, setResolvedCount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [chartData, setChartData] = useState([])
  const canvasRef = useRef(null)
  const tooltipRef = useRef(null)
  const scrollContainerRef = useRef(null)

  // Colors for the chart
  const colors = {
    total: "#4338ca", // Indigo
    pending: "#f59e0b", // Amber
    resolved: "#10b981", // Emerald
  }

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await API.get("/complaint/getAllComplaints")
        const complaints = response.data.complaints

        // Initialize counts
        const pending = complaints.filter((c) => c.status === "pending").length
        const resolved = complaints.filter((c) => c.status === "closed").length
        const total = pending + resolved

        setPendingCount(pending)
        setResolvedCount(resolved)
        setTotalCount(total)

        // Prepare data for chart
        const groupedByDate = complaints.reduce((acc, c) => {
          const date = new Date(c.createdAt).toLocaleDateString()
          if (!acc[date]) acc[date] = { date, total: 0, pending: 0, resolved: 0 }
          acc[date].total += 1
          if (c.status === "pending") acc[date].pending += 1
          if (c.status === "closed") acc[date].resolved += 1
          return acc
        }, {})

        // Convert grouped data into chart-friendly format
        const formattedData = Object.values(groupedByDate)

        // Sort by date
        formattedData.sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        })

        setChartData(formattedData)
      } catch (error) {
        console.error("Error fetching complaints:", error.response?.data?.message || error.message)
      }
    }

    fetchComplaints()
  }, [])

  useEffect(() => {
    if (chartData.length > 0 && canvasRef.current) {
      drawBarChart()

      // Add window resize listener to redraw chart when window size changes
      const handleResize = () => {
        drawBarChart()
      }

      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [chartData])

  const drawBarChart = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const tooltip = tooltipRef.current
    const scrollContainer = scrollContainerRef.current

    // Set fixed width per data point (this ensures we have enough space for all data points)
    const dataPointWidth = 100 // Width allocated for each date group
    const totalWidth = Math.max(scrollContainer.clientWidth, dataPointWidth * chartData.length)

    // Set canvas dimensions
    canvas.width = totalWidth
    canvas.height = 300 // Reduced height

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Chart dimensions
    const padding = 40
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2 - 40 // Extra space for legend
    const barWidth = Math.min(30, dataPointWidth / 4 - 4) // Divide by 4 to leave space between groups

    // Find max value for scaling
    const maxValue = Math.max(...chartData.map((d) => Math.max(d.total, d.pending, d.resolved)))
    const roundedMax = Math.ceil(maxValue / 5) * 5 // Round to nearest 5

    // Draw Y-axis and grid lines
    ctx.strokeStyle = "#e5e7eb"
    ctx.fillStyle = "#6b7280"
    ctx.font = "12px Arial"
    ctx.textAlign = "right"

    // Draw Y-axis labels and grid lines
    for (let i = 0; i <= 5; i++) {
      const value = (roundedMax / 5) * i
      const y = padding + chartHeight - chartHeight * (value / roundedMax)

      // Grid line
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(padding + chartWidth, y)
      ctx.stroke()

      // Label
      ctx.fillText(value.toString(), padding - 10, y + 4)
    }

    // Draw X-axis labels
    ctx.textAlign = "center"
    chartData.forEach((data, index) => {
      const x = padding + index * dataPointWidth + dataPointWidth / 2
      ctx.fillText(data.date, x, canvas.height - padding + 20)
    })

    // Draw bars
    chartData.forEach((data, index) => {
      const groupX = padding + index * dataPointWidth + dataPointWidth / 4

      // Total bar
      const totalHeight = (data.total / roundedMax) * chartHeight
      ctx.fillStyle = colors.total
      const totalX = groupX
      const totalY = padding + chartHeight - totalHeight
      drawRoundedRect(ctx, totalX, totalY, barWidth, totalHeight, 4)

      // Pending bar
      const pendingHeight = (data.pending / roundedMax) * chartHeight
      ctx.fillStyle = colors.pending
      const pendingX = groupX + barWidth + 4
      const pendingY = padding + chartHeight - pendingHeight
      drawRoundedRect(ctx, pendingX, pendingY, barWidth, pendingHeight, 4)

      // Resolved bar
      const resolvedHeight = (data.resolved / roundedMax) * chartHeight
      ctx.fillStyle = colors.resolved
      const resolvedX = groupX + barWidth * 2 + 8
      const resolvedY = padding + chartHeight - resolvedHeight
      drawRoundedRect(ctx, resolvedX, resolvedY, barWidth, resolvedHeight, 4)
    })

    // Draw legend
    const legendY = canvas.height - 20
    const legendItems = [
      { label: "Total", color: colors.total },
      { label: "Pending", color: colors.pending },
      { label: "Resolved", color: colors.resolved },
    ]

    legendItems.forEach((item, index) => {
      const x = padding + index * 100

      // Color box
      ctx.fillStyle = item.color
      ctx.fillRect(x, legendY, 15, 15)

      // Label
      ctx.fillStyle = "#6b7280"
      ctx.textAlign = "left"
      ctx.fillText(item.label, x + 20, legendY + 12)
    })

    // Add tooltip functionality
    canvas.onmousemove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const scrollLeft = scrollContainer.scrollLeft
      const mouseX = e.clientX - rect.left + scrollLeft
      const mouseY = e.clientY - rect.top

      let showTooltip = false

      // Check if mouse is over any bar
      chartData.forEach((data, index) => {
        const groupX = padding + index * dataPointWidth + dataPointWidth / 4

        // Check total bar
        const totalX = groupX
        const totalHeight = (data.total / roundedMax) * chartHeight
        const totalY = padding + chartHeight - totalHeight

        if (isPointInRect(mouseX, mouseY, totalX, totalY, barWidth, totalHeight)) {
          tooltip.style.display = "block"
          tooltip.style.left = e.clientX + 10 + "px"
          tooltip.style.top = e.clientY + 10 + "px"
          tooltip.innerHTML = `<strong>${data.date}</strong><br>Total: ${data.total}`
          showTooltip = true
        }

        // Check pending bar
        const pendingX = groupX + barWidth + 4
        const pendingHeight = (data.pending / roundedMax) * chartHeight
        const pendingY = padding + chartHeight - pendingHeight

        if (isPointInRect(mouseX, mouseY, pendingX, pendingY, barWidth, pendingHeight)) {
          tooltip.style.display = "block"
          tooltip.style.left = e.clientX + 10 + "px"
          tooltip.style.top = e.clientY + 10 + "px"
          tooltip.innerHTML = `<strong>${data.date}</strong><br>Pending: ${data.pending}`
          showTooltip = true
        }

        // Check resolved bar
        const resolvedX = groupX + barWidth * 2 + 8
        const resolvedHeight = (data.resolved / roundedMax) * chartHeight
        const resolvedY = padding + chartHeight - resolvedHeight

        if (isPointInRect(mouseX, mouseY, resolvedX, resolvedY, barWidth, resolvedHeight)) {
          tooltip.style.display = "block"
          tooltip.style.left = e.clientX + 10 + "px"
          tooltip.style.top = e.clientY + 10 + "px"
          tooltip.innerHTML = `<strong>${data.date}</strong><br>Resolved: ${data.resolved}`
          showTooltip = true
        }
      })

      if (!showTooltip) {
        tooltip.style.display = "none"
      }
    }

    canvas.onmouseleave = () => {
      tooltip.style.display = "none"
    }
  }

  // Helper function to draw rounded rectangle
  const drawRoundedRect = (ctx, x, y, width, height, radius) => {
    ctx.beginPath()
    ctx.moveTo(x + radius, y)
    ctx.lineTo(x + width - radius, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
    ctx.lineTo(x + width, y + height)
    ctx.lineTo(x, y + height)
    ctx.lineTo(x, y + radius)
    ctx.quadraticCurveTo(x, y, x + radius, y)
    ctx.closePath()
    ctx.fill()
  }

  // Helper function to check if point is in rectangle
  const isPointInRect = (x, y, rectX, rectY, rectWidth, rectHeight) => {
    return x >= rectX && x <= rectX + rectWidth && y >= rectY && y <= rectY + rectHeight
  }

  const nav = useNavigate()
  const view = () => {
    nav("/browse/complaints")
  }

  const cards = [
    { title: "Complaints Submitted", description: `${totalCount}`, button: "View All" },
    { title: "Pending Complaints", description: `${pendingCount}`, button: "View All" },
    { title: "Resolved Complaints", description: `${resolvedCount}`, button: "View All" },
  ]

  return (
    <div className="flex-1 p-4 ml-64">
      {/* Adjust ml-64 based on your sidebar width */}
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between hover:shadow-xl transition"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-700">{card.title}</h2>
                <p className="text-2xl font-bold text-indigo-600 mt-2">{card.description}</p>
              </div>
              <button onClick={view} className="text-sm text-blue-600 hover:underline self-end">
                {card.button}
              </button>
            </div>
          ))}
        </div>

        {/* Chart Container */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 w-full">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Complaints Over Time</h3>
              <p className="text-sm text-gray-500 mt-1">Tracking total, pending, and resolved complaints</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-indigo-600 mr-2"></div>
                <span className="text-xs text-gray-600">Total</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                <span className="text-xs text-gray-600">Pending</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
                <span className="text-xs text-gray-600">Resolved</span>
              </div>
            </div>
          </div>

          {/* Scrollable Chart Container with Shadow Indicators */}
          <div className="relative">
            {/* Left Shadow Indicator */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className="relative overflow-x-auto pb-4"
              style={{ height: "350px", width: "100%" }}
            >
              <canvas ref={canvasRef} style={{ height: "300px" }}></canvas>
            </div>

            {/* Right Shadow Indicator */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            {/* Tooltip */}
            <div
              ref={tooltipRef}
              style={{
                display: "none",
                position: "fixed",
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                padding: "8px 12px",
                borderRadius: "6px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                zIndex: 1000,
                pointerEvents: "none",
                fontSize: "0.875rem",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
