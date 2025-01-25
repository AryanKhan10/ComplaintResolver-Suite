import React from "react";

const teamMembers = [
    {
        name: 'Ahmed Ali',
        role: 'Project Manager',
        imageUrl:
            'https://images.unsplash.com/photo-1502767089024-52c5bdf67f52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjYxOXwwfDF8c2VhcmNofDd8fGJ1c2luZXNzfGVufDB8fHx8fDE2Nzg1NTczMTY&ixlib=rb-1.2.1&q=80&w=256',
    },
    {
        name: 'Arman Khan',
        role: 'Frontend Developer',
        imageUrl:
            'https://images.unsplash.com/photo-1570560574-2f0516c4d2b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjYxOXwwfDF8c2VhcmNofDJ8fGJ1c2luZXNzfGVufDB8fHx8fDE2Nzg1NTYwNjM&ixlib=rb-1.2.1&q=80&w=256',
    },
    {
        name: 'Omar Siddiqui',
        role: 'Backend Developer',
        imageUrl:
            'https://images.unsplash.com/photo-1506708898656-219d8e52454f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjYxOXwwfDF8c2VhcmNofDkxfGJ1c2luZXNzfGVufDB8fHx8fDE2Nzg1NTY3ODI&ixlib=rb-1.2.1&q=80&w=256',
    },
    {
        name: 'Bakhtiyar Muhammad',
        role: 'UI/UX Designer',
        imageUrl:
            'https://images.unsplash.com/photo-1509340495-d317d1794b0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjYxOXwwfDF8c2VhcmNofDgxfGJ1c2luZXNzfGVufDB8fHx8fDE2Nzg1NTY4Mzg&ixlib=rb-1.2.1&q=80&w=256',
    },
];

export default function Team() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
                <div className="max-w-xl">
                    <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                        Meet Our Team
                    </h2>
                    <p className="mt-6 text-lg text-gray-600">
                        We are a dedicated and passionate team working together to provide the best solutions for our clients.
                    </p>
                </div>
                <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                    {teamMembers.map((person) => (
                        <li key={person.name}>
                            <div className="flex items-center gap-x-6">
                                <img alt={person.name} src={person.imageUrl} className="h-16 w-16 rounded-full" />
                                <div>
                                    <h3 className="text-base font-semibold text-gray-900">{person.name}</h3>
                                    <p className="text-sm font-semibold text-indigo-600">{person.role}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
