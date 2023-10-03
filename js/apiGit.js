export class apiGit{
    static search(name){
        return fetch(`https://api.github.com/users/${name}`)
        .then((data) => data.json())
        .then(({ login, name, avatar_url, public_repos, followers }) => ({
          login,
          name,
          avatar_url,
          public_repos,
          followers,
        }));

    }
    
}