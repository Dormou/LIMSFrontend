
import { baseQuery } from "../baseQuery";
import { createApi } from '@reduxjs/toolkit/query/react';
import { FetchProjectsArchiveRequest, FetchProjectsRequest } from "./Request";
import { FetchProjectsArchiveResponse, FetchProjectsResponse, ProjectResponse } from "./Responses";


export const projectsApi = createApi({
    reducerPath: "projects",
    baseQuery: baseQuery,
    endpoints: builder => {
        return ({
            getProject: builder.query<ProjectResponse, string>({
                query: (id: string) => `projects?id=${id}`
            }),
            fetchProjects: builder.query<FetchProjectsResponse, FetchProjectsRequest>({
                query: data => ({
                    url: 'projects/fetch',
                    method: 'POST',
                    body: data
                })
            }),
            fetchProjectsArchive: builder.query<FetchProjectsArchiveResponse, FetchProjectsArchiveRequest>({
                query: data => ({
                    url: 'projects/fetch/archive',
                    method: 'POST',
                    body: data
                })
            }),
        })
    }
})

export const {
    useGetProjectQuery,
    useLazyGetProjectQuery,
    useFetchProjectsQuery,
    useFetchProjectsArchiveQuery,
} = projectsApi