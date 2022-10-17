import React from "react";
import axios from "axios";

const bytesToSize = (bytes) => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "n/a";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  if (i == 0) return bytes + " " + sizes[i];
  return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
};

const ProfileCard = ({ data }) => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 bg-white rounded-lg shadow-lg md:grid-cols-2">
      <img src={data.avatar_url} alt="Avatar" className="object-cover" />
      <div className="bg-slate-100 p-4">
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <p className="text-gray-600">{data.bio}</p>
        <p className="text-gray-600">{data.location}</p>
        <p className="text-gray-600">{data.email}</p>
        <p className="text-gray-600">{data.blog}</p>

        <div className="flex justify-between mt-4">
          <div className="text-center">
            <h2 className="text-lg font-bold">{data.public_repos}</h2>
            <p className="text-gray-600">Repos</p>

            {data.public_repos > 0 && (
              <a
                href={data.repos_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500"
              >
                View Repos
              </a>
            )}
          </div>
          <div className="text-center">
            <h2 className="text-lg font-bold">{data.followers}</h2>
            <p className="text-gray-600">Followers</p>

            {data.followers > 0 && (
              <a
                href={data.followers_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500"
              >
                View Followers
              </a>
            )}
          </div>
          <div className="text-center">
            <h2 className="text-lg font-bold">{data.following}</h2>
            <p className="text-gray-600">Following</p>

            {data.following > 0 && (
              <a
                href={data.following_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500"
              >
                View Following
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const RepoList = ({ repos_url }) => {
  const [repos, setRepos] = React.useState([]);
  React.useEffect(() => {
    axios.get(repos_url).then((res) => {
      console.log(repos_url);
      console.log(res.data);
      setRepos(res.data);
    });
  }, [repos_url]);
  return (
    <div className="m-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {repos.map((repo) => (
        <div
          key={repo.id}
          className="border border-gray-200 p-5 rounded bg-white"
        >
          <div className="flex justify-between">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500"
            >
              {repo.name}
            </a>
            <p className="text-gray-600 flex items-center gap-2">
              {bytesToSize(repo.size * 1024)} / {repo.language}
              {/* copy url to clipboard */}
              <i
                className="fas fa-clipboard"
                onClick={() => {
                  navigator.clipboard.writeText(repo.html_url);
                  alert("Copied to clipboard");
                }}
              ></i>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

function GithubProfile({ name }) {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    axios.get(`https://api.github.com/users/${name}`).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }, [name]);
  if (data) {
    return (
      <div className="container mx-auto bg-gray-100">
        <ProfileCard data={data} />
        <h1 className="text-2xl font-bold text-center mt-5">
          My Github Repositories
        </h1>
        <RepoList repos_url={data.repos_url} />
      </div>
    );
  }
  return null;
}

export default GithubProfile;
