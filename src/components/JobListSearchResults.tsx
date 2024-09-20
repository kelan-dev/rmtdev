import { useJobItemsContext } from "../contexts/context-hooks";
import JobList from "./JobList";

export default function JobListSearchResults() {
  const { jobItemsSortedAndSliced, isLoading } = useJobItemsContext();
  return <JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />;
}
