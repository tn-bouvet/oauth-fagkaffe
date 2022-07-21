# Frontend setup

```sh
yarn create react-app frontend --template typescript
cd frontend
yarn add @azure/msal-react @azure/msal-browser
```

Microsoft har god dokumentasjon på prosessen fra dette steget 
[her](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md).

I dette prosjektet satt jeg opp det meste selv, se spesielt på `core/api.ts` og 
`core/msal.ts`
