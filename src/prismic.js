import * as prismic from '@prismicio/client'

// Fill in your repository name
export const repositoryName = 'https://amadou.cdn.prismic.io/api/v2'

export const client = prismic.createClient(repositoryName, {
  // If your repository is private, add an access token
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoibWFjaGluZTJtYWNoaW5lIiwiZGJpZCI6ImFtYWRvdS0yN2Y1ZjkwYS0wOTFjLTQwMGItOTMzZi1hNWIyNWQ3MjVhNTJfNCIsImRhdGUiOjE2NjQ0MzU0NzIsImRvbWFpbiI6ImFtYWRvdSIsImlhdCI6MTY2NDQzNTQ3Mn0.2LYqPLZR5wiRF6MiI7FzC2YX0_rfEyF1UkcBrXKS_HA',

  // This defines how you will structure URL paths in your project.
  // Update the types to match the Custom Types in your project, and edit
  // the paths to match the routing in your project.
  //
  // If you are not using a router in your project, you can change this
  // to an empty array or remove the option entirely.
  routes: [
    // {
    //   type: 'homepage',
    //   path: '/',
    // },
  ],
})