
import { baseQuery } from "../baseQuery";
import { createApi } from '@reduxjs/toolkit/query/react';
import { AddProjectRequest, FetchProjectsArchiveRequest, FetchProjectsRequest, ProjectStatusChangeRequest, UpdateProjectRequest } from "./Request";
import { FetchProjectsArchiveResponse, FetchProjectsResponse, ProjectResponse } from "./Responses";
import { Project } from "./Types";


export const projectsApi = createApi({
    reducerPath: "projects",
    baseQuery: baseQuery,
    endpoints: builder => {
        return ({
            addProject: builder.query<string, AddProjectRequest>({
                query: data => ({
                    url: 'api/project/add',
                    method: 'POST',
                    body: data
                })
            }),
            updateProject: builder.mutation<Project, UpdateProjectRequest>({
                query: data => ({
                    url: 'api/project',
                    method: 'PUT',
                    body: data
                })
            }),
            changeCurrentStatus: builder.mutation<void, ProjectStatusChangeRequest>({
                query: data => ({
                    url: 'api/project/status',
                    method: 'POST',
                    body: data
                })
            }),
            getStatusProject: builder.query<string, string>({
                query: (id: string) => `api/project/status/${id}`
            }),
            getProject: builder.query<ProjectResponse, string>({
                query: (id: string) => `api/project?id=${id}`
            }),
            fetchProjects: builder.query<FetchProjectsResponse, FetchProjectsRequest>({
                query: (request: FetchProjectsRequest) => `api/project?limit=${request.limit}&numberSkip=${request.numberSkip}`

            }),
            fetchProjectsArchive: builder.query<FetchProjectsArchiveResponse, FetchProjectsArchiveRequest>({
                query: data => ({
                    url: 'projects/archive',
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
    useLazyFetchProjectsQuery,
    useFetchProjectsArchiveQuery,
    useLazyGetStatusProjectQuery,
    useGetStatusProjectQuery,
    useUpdateProjectMutation,
    useChangeCurrentStatusMutation,
} = projectsApi