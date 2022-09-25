
export let backend_url:string;
if (process.env.NODE_ENV === 'production') {
    backend_url = "https://southwestdeploy.herokuapp.com/api/"

} else {
    backend_url = "http://localhost:1200/api/"
}
