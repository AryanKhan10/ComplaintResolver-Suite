# Complaint Mangment System
<h2>Introduction</h2>
<h3>Project Orview</h3>
<P>The <b>Complaint Management and Tracking System</b> is designed to streamline the process of managing complaints in an<br> organization. It provides a platform where users can submit, track, and resolve their complaints <br>efficiently. The system automates complaint handling, ensuring that issues are resolved in a timely <br>manner with proper documentation and tracking.</P> <br><br>
<h3>Problem Statement</h3>
<p>Organizations face challenges in managing complaints manually, leading to delayed responses,<br> lost records, and unsatisfied users. There is a need for a centralized system that ensures proper <br>registration, tracking, and resolution of complaints, with transparency in the process.</p><br><br>
<h3>Goals and Objectives</h3>
<ul>
<li>To provide a centralized platform for complaint submission and tracking.</li>
<li>To ensure timely resolution of complaints by assigning tasks to the relevant departments.</li>
<li>To enable users to track the status of their complaints in real-time.</li>
<li>To generate reports for management to assess performance and areas needing improvement.</li>
</ul><br>
<h3>Scope and Limitation</h3>
<h3>Scope:</h3>
<ul>
<li>User registration and complaint submission.</li>
<li>Tracking of complaints by users and administrators</li>
<li>Assigning complaints to respective departments for resolution</li>
<li>Notifications to users regarding status updates</li>
</ul><br>
<h3>Limitation:</h3>
<ul>
<li>The system will not address complaints beyond the organization.</li>
<li>It requires internet access for complaint submission and tracking.</li>
</ul><br>
<h2>System Requirements<h2>
<h3>Functional Requirements:</h3>
<ul>
<li><b>User Authentication:</b> Users must register and log in to the system.</li>
<li><b>Complaint Submission:</b> Users can submit complaints by providing details like category,description, and attachments.</li>
<li><b>omplaint tracking:</b>Users can view the status of their submitted complaints.</li>
<li><b>Admin Management:</b>Administrators can assign complaints to departments and update the status.</li>
<li><b>Notification System:</b>Users receive notifications via email or system alerts about complaint updates.</li>
</ul><br>
<h3>Non Functional Requirements</h3>
<ul>
<li><b>Performance:</b>The system should handle multiple users and complaints without lag.</li>
<li><b>Security:</b>User data, especially complaint details, must be protected with proper encryption and authentication mechanisms.</li>
<li><b>Usubality:</b>The system should be user-friendly, with an intuitive interface for both users and administrators</li>
<li><b>Availability:</b>The system must be available 24/7 with minimal downtime.</li>
<li><b>Scalability:</b>The system should support the growing number of users and complaints.</li>
</ul><br>
<h3>User Requirements:</h3>
<ul>
<li>Users should be able to register and log in easily.</li>
<li>They should be able to submit, track, and receive updates on their complaints.</li>
<li>Administrators should be able to manage complaints efficiently and assign tasks to departments.</li>
</ul><br>
<h2>System Design</h2>
<h3>Entity Relation Ship Diagram (ERD):</h3>
<h4>Entities:</h4>
<h5>Primary Entities:</h5>
<ul>
<li><b>User Complaint:</b>Stores information about the users who submit complaints</li>
<li><b>Complaint:</b>Stores details about complaints, such as the description, type, and status.</li>
<li><b>Administrator:</b>Manages and oversees the resolution of complaints</li>
<li><b>(Catageory)Complaint Type:</b>Defines the type of complaint (e.g., technical, service-related).</li>
<li><b>Complaint Status:</b>Tracks the progress of a complaint (e.g., submitted, in progress, resolved).</li>
</ul><br><br>
<h5>Secondary Entities:</h5>
<ul>
<li><b>Department:</b>Responsible for handling and resolving complaints.</li>
<li><b>Officer:</b>Assigned individuals within departments responsible for resolving specific complaints.</li>
<li><b>Response:</b>Records actions taken by officers to address the complaints.</li>
<li><b>Comment:</b>Contains additional notes or feedback from users and officers.</li>
<li><b>Attachment:</b>Stores any supporting documents or evidence provided with complaints.</li>
</ul> <br>
<h5>Optional Entity(Dependig on projrct requirements)</h5>
<ul>
<li><b>Location:</b>Tracks the geographic location associated with the complaint.</li>
<li><b>Priority:</b> Represents the urgency or priority level of the complaint.</li>
<li><b>Escalation:</b>Records the history of complaint escalations to higher authorities.</li>
<li><b>Resolution:</b>Stores details of how the complaint was resolved.</li>
<li><b>Feedback:</b> Collects user feedback after the resolution of the complaint.</li>
</ul>
<p>
These entities are interconnected to capture the flow of data and ensure proper complaint management and resolution.</p><br>
<h3>Entities And Their attributes:</h3>
<h4>Primary Entities:</h4>
<h5>User(Complainant)Attributes:</h5>
<h6>UserID (Primary Key)</h6>
<ul>
<li>FullName</li>
<li>Email</li>
<li>PhoneNumber</li>
<li>Password</li>
<li>Address</li>
<li>UserType (Regular or VIP)</li>
<li>DateJoined</li>
<li>LastLogin</li>
</ul><br>
<h5>Complaint:</h5>
<h6>Attributes:</h6>
<ul><li>ComplaintID (Primary Key)</li>
<li>UserID (Foreign Key referencing User)</li>
<li>CategoryID (Foreign Key referencing Category)</li>
<li>StatusID (Foreign Key referencing Status)</li>
<li>ComplaintTitle</li>
<li>ComplaintDescription</li>
<li>DateFiled</li>
<li>LocationID (Optional, Foreign Key referencing Location)</li>
<li>PriorityID (Optional, Foreign Key referencing Priority)</li>
<li>EscalationID (Optional, Foreign Key referencing Escalation)</li>
<li>ResolutionID (Optional, Foreign Key referencing Resolution)</li>
<li>FeedbackID (Optional, Foreign Key referencing Feedback)</li>
</ul><br>
<h5>Administrator:</h5>
<h6>Attributes:</h6>
<ul>
<li>AdminID (Primary Key)</li>
<li>FullName</li>
<li>Email</li>
<li>PhoneNumber</li>
<li>Password</li>
<li>Role (e.g., Super Admin, Support Admin)</li>
<li>DateJoined</li>
<li>LastLogin</li>
<li>Category (Complaint Type)</li>
</ul><br>
<h5>Attributes:</h5>
<ul>
<li>CategoryID (Primary Key)</li>
<li>CategoryName</li>
<li>CategoryDescription</li>
</ul><br>
<h5>Status (Complaint Status)</h5>
<h6>Attributes:</h6>
<ul>
<li>StatusID (Primary Key)</li>
<li>StatusName (e.g., Pending, In Progress, Resolved, Closed)</li>
<li>StatusDescription</li>
</ul><br>
<h4>Secondary Entities:</h4>
<h5>Department</h5>
<h6>Attributes:</h6>
<ul>
<li>DepartmentID (Primary Key)</li>
<li>DepartmentName</li>
<li>DepartmentHead</li>
<li>DepartmentContact</li>
</ul><br>
<h5>Officer</h5>
<h6>Attributes:</h6>
<ul>
<li>OfficerID (Primary Key)</li>
<li>FullName</li>
<li>Email</li>
<li>PhoneNumber</li>
<li>DepartmentID (Foreign Key referencing Department)</li>
<li>AssignedComplaintsCount</li>
<li>DateAssigned</li>
</ul><br>
<h5>Response (Actions Taken)</h5>
<h6>Attributes:</h6>
<ul>
<li>ResponseID (Primary Key)</li>
<li>ComplaintID (Foreign Key referencing Complaint)</li>
<li>OfficerID (Foreign Key referencing Officer)</li>
<li>ResponseDescription</li>
<li>DateResponded</li>
</ul><br>
<h5>Comment (Additional Notes)</h6>
<h6>Attributes:</h6>
<ul>
<li>CommentID (Primary Key)</li>
<li>ComplaintID (Foreign Key referencing Complaint)</li>
<li>UserID (Foreign Key referencing User)</li>
<li>OfficerID (Optional, Foreign Key referencing Officer)</li>
<li>CommentText</li>
<li>DateCommented</li>
</ul><br>
<h5>Attachment (Supporting Documents)</h5>
<h6>Attributes:</h6>    
<ul>
<li>AttachmentID (Primary Key)</li>
<li>ComplaintID (Foreign Key referencing Complaint)</li>
<li>AttachmentType (e.g., Image, PDF)</li>
<li>AttachmentURL</li>
<li>DateUploaded</li>
</ul><br>
<h3>Optional Entities:</h3>
<h4>Location (Geographic Location)</h4>
<h5>Attributes:</h5>
<ul>
<li>LocationID (Primary Key)</li>
<li>ComplaintID (Foreign Key referencing Complaint)</li>
<li>LocationName</li>
<li>Latitude</li>
<li>Longitude</li>
</ul><br>
<h5>Priority (Complaint Priority Level)</h5>
<h6>Attributes:</h6>
<ul>
<li>PriorityID (Primary Key)</li>
<li>PriorityLevel (e.g., Low, Medium, High)</li>
<li>PriorityDescription</li>
</ul><br>
<h5>Escalation (Escalation History)</h5>
<h6>Attributes:</h6>
<ul>
<li>EscalationID (Primary Key)</li>
<li>ComplaintID (Foreign Key referencing Complaint)</li>
<li>EscalationLevel (e.g., Level 1, Level 2)</li>
<li>EscalationDate</li>
<li>EscalationDescription</li>
</ul><br>
<h5>Resolution (Resolution Details)</h5>
<h6>Attributes:</h6>
<ul>
<li>ResolutionID (Primary Key)</li>
<li>ComplaintID (Foreign Key referencing Complaint)</li>
<li>ResolutionDescription</li>
<li>DateResolved</li>
<li>ResolvedByOfficerID (Foreign Key referencing Officer)</li>
</ul><br>
<h5>Feedback (User Feedback on Resolution)</h5>
<h6>Attributes:<h6>
<ul>
<li>FeedbackID (Primary Key)</li>
<li>ComplaintID (Foreign Key referencing Complaint)</li>
<li>UserID (Foreign Key referencing User)</li>
<li>Rating (e.g., 1 to 5 stars)</li>
<li>FeedbackComments</li>
<li>DateFeedbackGiven</li>
</ul><br>
<h5>Entities and Their Relations;</h5>
<h6>User (Complainant)</h6>
<ul>
<li>UserID → Complaint</li>
<li>UserID → Comment</li>
<li>UserID → Feedback</li>
</ul><br>
<h6>Complaint</h6>  
<ul>
<li>ComplaintID → Category</li>
<li>ComplaintID → Status</li>
<li>ComplaintID → Department</li>
<li>ComplaintID → Response</li>
<li>ComplaintID → Comment</li>
<li>ComplaintID → Attachment</li>
<li>ComplaintID → Location (Optional)</li>
<li>ComplaintID → Priority (Optional)</li>
<li>ComplaintID → Escalation (Optional)</li>
<li>ComplaintID → Resolution (Optional)</li>
<li>ComplaintID → Feedback (Optional)</li>
</ul><br>
<h6>Administrator</h6>
<ul>
<li>AdminID → Complaint</li>
<li>AdminID → Officer (Admin may assign officers)</li>
</ul><br>
<h6>Category (Complaint Type)</h6>
<ul>
<li>CategoryID → Complaint</li>
</ul><br>
<h6>Status (Complaint Status)</h6>
<ul>
<li>StatusID → Complaint</li>
</ul><br>
<h6>Department</h6>
<ul>
<li>DepartmentID → Officer</li>
<li>DepartmentID → Complaint</li>
</ul><br>
<h6>Officer</h6>
<ul>
<Li>OfficerID → Response</li>
<Li>OfficerID → Comment</li>
<Li>OfficerID → Complaint (Assigned complaints)</li>
<li>OfficerID → Resolution</li>
</ul><br>
<h6>Response (Actions Taken)</h6>
<ul>
<Li>ResponseID → Complaint</li>
<Li>ResponseID → Officer</li>
</ul><br>
<h6>Comment (Additional Notes)</h6>
<ul>
<Li>CommentID → Complaint</li>
<Li>CommentID → User</li>
<Li>CommentID → Officer</li>
</ul><br>
<h6>Attachment (Supporting Documents)</h6>
<ul>
<Li>AttachmentID → Complaint</li>
</ul><br>
<h6>Location (Geographic Location)</h6>
<ul>
<Li>LocationID → Complaint (Optional)</li>
</ul><br>
<h6>Priority (Complaint Priority Level)</h6>
<ul>
<Li>PriorityID → Complaint (Optional)</li>
</ul><br>
<h6>Escalation (Escalation History)</h6>
<ul>
<Li>EscalationID → Complaint (Optional)</li>
</ul><br>
<h6>Resolution (Resolution Details)</h6>
<ul>
<li>ResolutionID → Complaint</li>
<li>ResolutionID → Officer</li>
</ul><br>
<h6>Feedback (User Feedback on Resolution)</h6>
<ul>
<li>FeedbackID → Complaint</li>
<li>FeedbackID → User</li>
</ul><br>
<br><br>
<h3>Data Flow Diagrams (DFDs)</h3>
<p>Level 0 (Context Diagram): Represents the entire system as a single process interacting with external entities like users and administrators.<br>
Level 1: Breaks down the complaint submission, tracking, and resolution processes into smaller, detailed sub-processes.</p> <br>
<h5>System Architecture</h5>
<p>The system follows a three-tier architecture:<br>
Presentation Layer: User interface for web-based interaction (HTML, CSS, JavaScript).<br>
Business Logic Layer: Handles the logic for complaint submission, tracking, and management (Node.js, Express).<br>Data Layer: Manages the database (MongoDB) for storing complaints, user details, and statuses.
</p><br>
<h5>Database Schema</h5>
<p>User Table: Stores user details like user ID, name, email, and password.<br>
Complaint Table: Stores complaint details like complaint ID, user ID, description, status, department assigned, and date.<br>
Department Table: Stores department information with department ID and name.<br>
Admin Table: Stores admin details and permissions.
</p>
=======

>>>>>>> 5d17cfa6ed2c49ffbffb5d47dfb844f10c2eee57
