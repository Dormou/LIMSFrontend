
import { baseQuery } from "../baseQuery";
import { createApi } from '@reduxjs/toolkit/query/react';
import { AddProjectRequest, FetchProjectsArchiveRequest, FetchProjectsRequest } from "./Request";
import { FetchProjectsArchiveResponse, FetchProjectsResponse, ProjectResponse } from "./Responses";


export const projectsApi = createApi({
    reducerPath: "projects",
    baseQuery: baseQuery,
    endpoints: builder => {
        return ({
            addProject: builder.query<string, AddProjectRequest>({
                query: data => ({
                    url: 'projects/add',
                    method: 'POST',
                    body: data
                })
            }),
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