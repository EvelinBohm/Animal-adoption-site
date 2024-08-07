import fetchSearchResult from "../api/search/fetchSearch";
import { useQuery } from "@tanstack/react-query";

const useSearch=({searchParam})=>{
    const results = useQuery(["search", searchParam], fetchSearchResult);
    return {results}
}
export default useSearch;