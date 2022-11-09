import SearchBox from "../searchBox"
import Moment from 'react-moment';
import { container } from "tsyringe";
import { TextilHelper } from "../../util/TextilHelper";
import { useEffect, useState } from "react";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Jobs({ signer }) {

    const [publishedJobs, setPublishedJobs] = useState([]);
    const textilHelper = container.resolve(TextilHelper);
    const [processing, setProcessing] = useState(false);

    const queryJobPosts = async () => {
        try {
            console.log('Loading jobs...');
            const result = await textilHelper.queryAllPublishedJobPosts();
            console.log('Loading jobs...', result);
            setPublishedJobs(result);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {

        if (textilHelper) queryJobPosts();

    }, []);

    return (
        <div className="px-4 py-6 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">

                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <SearchBox />
                </div>
            </div>
            <div className="-mx-4 mt-6 ring-1 ring-gray-300 sm:-mx-6 md:mx-0 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Position
                            </th>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                            >
                                Company
                            </th>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 lg:table-cell"
                            >
                                Openings
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                                Bounty
                            </th>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-center text-sm font-semibold text-gray-900 lg:table-cell"
                            >
                                Published
                            </th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span className="sr-only">Apply</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {publishedJobs.map((jobPosition, jobIdx) => (
                            <tr key={jobPosition._id}>
                                <td
                                    className={classNames(
                                        jobIdx === 0 ? '' : 'border-t border-transparent',
                                        'relative py-4 pl-4 sm:pl-6 pr-3 text-sm'
                                    )}
                                >
                                    <div className="font-medium text-gray-900">
                                        {jobPosition.title}
                                    </div>
                                    {jobIdx !== 0 ? <div className="absolute right-0 left-6 -top-px h-px bg-gray-200" /> : null}
                                </td>
                                <td
                                    className={classNames(
                                        jobIdx === 0 ? '' : 'border-t border-gray-200',
                                        'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                                    )}
                                >
                                    {jobPosition.company}
                                </td>
                                <td
                                    className={classNames(
                                        jobIdx === 0 ? '' : 'border-t border-gray-200',
                                        'hidden px-3 py-3.5 text-sm text-right text-gray-500 lg:table-cell'
                                    )}
                                >
                                    {jobPosition.positionsToFill}
                                </td>
                                <td
                                    className={classNames(
                                        jobIdx === 0 ? '' : 'border-t border-gray-200',
                                        'px-3 py-3.5 text-sm text-right text-gray-500'
                                    )}
                                >
                                    ${jobPosition.bountyAmount}
                                </td>
                                <td
                                    className={classNames(
                                        jobIdx === 0 ? '' : 'border-t border-gray-200',
                                        'hidden px-3 py-3.5 text-sm text-center text-gray-500 lg:table-cell'
                                    )}
                                >
                                    <Moment date={jobPosition.publishedAt} fromNow={true} />
                                </td>

                                <td
                                    className={classNames(
                                        jobIdx === 0 ? '' : 'border-t border-transparent',
                                        'relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-sm font-medium'
                                    )}
                                >
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-md border border-gray-300 bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-30"
                                        disabled={!signer}
                                        title={signer ? '' : 'Connect your wallet to apply'}
                                    >
                                        Apply<span className="sr-only"></span>
                                    </button>
                                    {jobIdx !== 0 ? <div className="absolute right-6 left-0 -top-px h-px bg-gray-200" /> : null}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
