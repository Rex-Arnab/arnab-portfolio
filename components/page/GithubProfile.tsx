"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { bytesToSize } from "@/lib/utils";
import { Profile } from "@/types/user";
import { Repo } from "@/types/repo";

const ProfileCard = ({ data }) => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 bg-white rounded-lg shadow-lg md:grid-cols-2">
      <div className="flex flex-col items-center justify-center">
        {/* Image with white border */}
        <div className="relative w-56 h-56 rounded-full border-4 border-white">
          <Image
            src={data.avatar_url}
            alt="Profile Picture"
            layout="fill"
            className="rounded-full"
          />

          <div className="absolute bottom-4 right-4 p-1 bg-white rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-slate-100 p-4 rounded-lg flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <p className="text-gray-600">{data.bio}</p>
        <p className="text-gray-600">{data.location}</p>
        <p className="text-gray-600">{data.email}</p>
        <p className="text-gray-600">{data.blog}</p>

        <div className="flex justify-between mt-4 w-full">
          <div className="text-center">
            <h2 className="text-lg font-bold">{data.public_repos}</h2>
            <p className="text-gray-600">Repos</p>

            {data.public_repos > 0 && (
              <a
                href={data.repos_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 border border-blue-500 rounded px-2 py-1 hover:bg-blue-500 hover:text-white">
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
                className="text-blue-500 border border-blue-500 rounded px-2 py-1 hover:bg-blue-500 hover:text-white">
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
                className="text-blue-500 border border-blue-500 rounded px-2 py-1 hover:bg-blue-500 hover:text-white">
                View Following
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const RepoCard = ({ repo }: { repo: Repo }) => {
  const [isCopied, setIsCopied] = useState<Boolean>(false);
  return (
    <div key={repo.id} className="border border-gray-200 p-5 rounded bg-white">
      <div className="flex justify-between">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500">
          {repo.name}
        </a>
        <p className="text-gray-600 flex items-center gap-2">
          {bytesToSize(repo.size * 1024)} / {repo.language}
          {/* copy url to clipboard */}
          {isCopied ? (
            <i className="fas fa-check text-green-500"></i>
          ) : (
            <i
              className="fas fa-clipboard cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(repo.html_url);
                setIsCopied(true);
                setTimeout(() => {
                  setIsCopied(false);
                }, 2000);
              }}></i>
          )}
        </p>
      </div>
    </div>
  );
};

const RepoList = ({ repos_url }: { repos_url: string }) => {
  const [repos, setRepos] = useState<Repo[] | []>([]);
  useEffect(() => {
    axios.get(repos_url).then((res) => {
      setRepos(res.data);
    });
  }, [repos_url]);
  return (
    <div className="m-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {repos.map((repo, index) => (
        <RepoCard repo={repo} key={index} />
      ))}
    </div>
  );
};

function GithubProfile({ name }: { name: string }) {
  const [data, setData] = useState<Profile | null>(null);
  useEffect(() => {
    axios.get(`https://api.github.com/users/${name}`).then((response) => {
      setData(response.data);
    });
  }, [name]);
  if (data) {
    return (
      <div className="container mx-auto bg-gray-100 p-5">
        <ProfileCard data={data} />
        <h1 className="text-2xl font-bold text-center mt-5">
          My Github Repositories
        </h1>
        {data && <RepoList repos_url={data.repos_url} />}
      </div>
    );
  }
  return null;
}

export default GithubProfile;
