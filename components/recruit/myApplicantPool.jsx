import { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { container } from "tsyringe";
import { TextilHelper } from "../../util/TextilHelper";
import { ApplicationStatus } from "../../services/IJobApplicationService"

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function MyApplicantPool({ signer, jobApplicationServiceInstance }) {

    const [applicants, setApplicants] = useState([]);
    const [processing, setProcessing] = useState(false);
    const textilHelper = container.resolve(TextilHelper);

    const queryMyApplicants = async () => {
        try {
            console.log('Loading applications...');
            const result = await textilHelper.queryApplicantionsByRecruiter(await signer.getAddress());
            //TODO call contract method myApplicants to get statuses from blockchain
            console.log('Loading applications...', result);
            setApplicants(result.map(job => {
                return { ...job, status: 'Screening' };
            }));
        } catch (e) {
            console.error(e);
        }
    }

    const onChangStatus = async (applicantion, newStatus) => {
        try {
            setProcessing(true);
            const newApplication = { ...applicantion };
            await jobApplicationServiceInstance.changeApplicationStatus(signer, {
                jobId: applicantion.publishedId,
                applicantAddress: applicantion.applicantAddress,
                status: parseInt(newStatus)
            });

            /*  newJobPost.publishedId = publishedId;
             newJobPost.publishedAt = new Date().toISOString();
             newJobPost.isPublished = true;
             console.log('updating job post', newJobPost);
             const result = await textilHelper.updateJobPost(newJobPost); */
            queryMyApplicants();
            //TODO call the contract to change status
            console.log('onChangStatus', event.target.value);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {

        if (textilHelper && signer) queryMyApplicants();

    }, []);

    return (
        <div className="px-4 py-6 sm:px-6 lg:px-8">
            {signer ? <>
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <span className="isolate inline-flex rounded-md shadow-sm">
                            <button
                                type="button"
                                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:bg-gray-600 focus:text-white focus:outline-none"
                            >
                                Screening
                            </button>
                            <button
                                type="button"
                                className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:bg-gray-600 focus:text-white focus:outline-none"
                            >
                                Interview
                            </button>
                            <button
                                type="button"
                                className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:bg-gray-600 focus:text-white focus:outline-none"
                            >
                                Assessment
                            </button>
                            <button
                                type="button"
                                className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:bg-gray-600 focus:text-white focus:outline-none"
                            >
                                Final Interview
                            </button>
                            <button
                                type="button"
                                className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:bg-gray-600 focus:text-white focus:outline-none"
                            >
                                Hired
                            </button>
                            <button
                                type="button"
                                className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:bg-gray-600 focus:text-white focus:outline-none"
                            >
                                Rejected
                            </button>
                        </span>
                    </div>
                    <div className="mt-4 mr-2 sm:mt-0 sm:ml-16 sm:flex-none">

                    </div>
                </div>
                <div className="-mx-4 mt-6 ring-1 ring-gray-300 sm:-mx-6 md:mx-0 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Address
                                </th>
                                <th
                                    scope="col"
                                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                                >
                                    Position
                                </th>
                                <th
                                    scope="col"
                                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                                >
                                    Applied
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-center">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {applicants.map((applicant, applicantIdx) => (
                                <tr key={applicant._id}>
                                    <td
                                        className={classNames(
                                            applicantIdx === 0 ? '' : 'border-t border-transparent',
                                            'relative py-4 pl-4 sm:pl-6 pr-3 text-sm'
                                        )}
                                    >
                                        <div className="font-medium text-gray-900">
                                            {applicant.applicantAddress}
                                        </div>
                                        {applicantIdx !== 0 ? <div className="absolute right-0 left-6 -top-px h-px bg-gray-200" /> : null}
                                    </td>
                                    <td
                                        className={classNames(
                                            applicantIdx === 0 ? '' : 'border-t border-gray-200',
                                            'hidden px-3 py-3.5 text-sm text-left text-gray-500 lg:table-cell'
                                        )}
                                    >
                                        {applicant.title}
                                    </td>
                                    <td
                                        className={classNames(
                                            applicantIdx === 0 ? '' : 'border-t border-gray-200',
                                            'hidden px-3 py-3.5 text-sm text-left text-gray-500 lg:table-cell'
                                        )}
                                    >
                                        <Moment date={applicant.applied} fromNow={true} />
                                    </td>

                                    <td
                                        className={classNames(
                                            applicantIdx === 0 ? '' : 'border-t border-transparent',
                                            'relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-sm font-medium'
                                        )}
                                    >
                                        <select
                                            id="location"
                                            name="location"
                                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            defaultValue={applicant.status}
                                            onChange={e => onChangStatus(e.target.value, applicant)}
                                        >
                                            <option value={ApplicationStatus.SCREENING}>Screening</option>
                                            <option value={ApplicationStatus.FIRST_INTERVIEW}>Interview</option>
                                            <option value={ApplicationStatus.TECHNICAL_TEST}>Assessment</option>
                                            <option value={ApplicationStatus.FINAL_INTERVIEW}>F. Interview</option>
                                            <option value={ApplicationStatus.HIRED}>Hired</option>
                                            <option value={ApplicationStatus.REJECTED}>Rejected</option>
                                        </select>
                                        {applicantIdx !== 0 ? <div className="absolute right-6 left-0 -top-px h-px bg-gray-200" /> : null}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </> : <div className="alert alert-danger" role="alert"> You need a connection to use this feature.</div>}
        </div>
    )
}
