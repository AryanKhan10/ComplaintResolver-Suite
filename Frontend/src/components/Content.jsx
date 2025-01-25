import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faLock, faServer } from '@fortawesome/free-solid-svg-icons';
import cmsImg from '../assets/cms.png'

export default function Content() {
    return (
        <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <svg
                    aria-hidden="true"
                    className="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
                >
                    <defs>
                        <pattern
                            x="50%"
                            y={-1}
                            id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                            width={200}
                            height={200}
                            patternUnits="userSpaceOnUse"
                        >
                            <path d="M100 200V.5M.5 .5H200" fill="none" />
                        </pattern>
                    </defs>
                    <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                        <path
                            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                            strokeWidth={0}
                        />
                    </svg>
                    <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
                </svg>
            </div>
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="lg:max-w-lg">
                            <p className="text-base/7 font-semibold text-indigo-600">Streamlined Issue Resolution</p>
                            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                                Simplify Complaint Management
                            </h1>
                            <p className="mt-6 text-xl/8 text-gray-700">
                                Submit your university-related issues directly to the concerned department. From academic queries to facility concerns, our system ensures a seamless resolution process.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                    <img
                        alt="App preview"
                        src={cmsImg}
                        className="w-[48rem] max-w-none rounded-xl bg-gray-900 ring-1 shadow-xl ring-gray-400/10 sm:w-[57rem]"
                    />
                </div>
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="max-w-xl text-base/7 text-gray-700 lg:max-w-lg">
                            <p>
                                With our platform, students, faculty, and staff can submit complaints effortlessly. Whether it’s about maintenance, academics, or administrative processes, we bridge the communication gap to ensure swift action.
                            </p>
                            <ul role="list" className="mt-8 space-y-8 text-gray-600">
                                <li className="flex gap-x-3">
                                    <FontAwesomeIcon
                                        icon={faArrowUp}
                                        className="mt-1 flex-none text-indigo-600"
                                    />
                                    <span>
                                        <strong className="font-semibold text-gray-900">Track Progress in Real-Time.</strong> Get live updates on the status of your submitted complaints, ensuring transparency at every step.
                                    </span>
                                </li>
                                <li className="flex gap-x-3">
                                    <FontAwesomeIcon
                                        icon={faLock}
                                        className="mt-1 flex-none text-indigo-600"
                                    />
                                    <span>
                                        <strong className="font-semibold text-gray-900">Secure and Confidential.</strong> Your complaints and personal information are handled with the utmost care, ensuring complete confidentiality.
                                    </span>
                                </li>
                                <li className="flex gap-x-3">
                                    <FontAwesomeIcon
                                        icon={faServer}
                                        className="mt-1 flex-none text-indigo-600"
                                    />
                                    <span>
                                        <strong className="font-semibold text-gray-900">Reliable Infrastructure.</strong> Our robust platform ensures seamless submission, tracking, and resolution of all complaints without downtime.
                                    </span>
                                </li>
                            </ul>
                            <p className="mt-8">
                                Make your voice heard with ReflexCMS. Our mission is to empower the university community by streamlining communication and enhancing issue resolution.
                            </p>
                            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Why Choose Us?</h2>
                            <p className="mt-6">
                                ReflexCMS simplifies the complaint resolution process, offering unmatched reliability, speed, and transparency. No matter your concern, we’re here to ensure you’re heard and supported.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
