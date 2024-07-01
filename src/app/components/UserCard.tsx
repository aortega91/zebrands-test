import Image from 'next/image';
import { useEffect, useState } from 'react';

export type TUser = {
  login: string;
  avatar_url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  repos_url: string;
}
type TUserCardProps = {
  user: TUser;

}

export default function UserCard({ user }: TUserCardProps) {
  const [userFollowers, setUserFollowers] = useState(0);
  const [userFollowing, setUserFollowing] = useState(0);
  const [userRepos, setUserRepos] = useState(0);

  const [imageLoadError, setImageLoadError] = useState(false);

  const fetchRemoteData = (url:string) => fetch(url).then(
    (response) => response.json(),
  );

  useEffect(() => {
    fetchRemoteData(user.followers_url).then((data) => {
      setUserFollowers(data.length);
    });
    fetchRemoteData(user.following_url.split('{/other_user}')[0]).then((data) => {
      setUserFollowing(data.length);
    });
    fetchRemoteData(user.repos_url).then((data) => {
      setUserRepos(data.length);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
  * {
    "login": "aortega",
    "id": 668917,
    "node_id": "MDQ6VXNlcjY2ODkxNw==",
    "avatar_url": "https://avatars.githubusercontent.com/u/668917?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/aortega",
    "html_url": "https://github.com/aortega",
    "followers_url": "https://api.github.com/users/aortega/followers",
    "following_url": "https://api.github.com/users/aortega/following{/other_user}",
    "gists_url": "https://api.github.com/users/aortega/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/aortega/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/aortega/subscriptions",
    "organizations_url": "https://api.github.com/users/aortega/orgs",
    "repos_url": "https://api.github.com/users/aortega/repos",
    "events_url": "https://api.github.com/users/aortega/events{/privacy}",
    "received_events_url": "https://api.github.com/users/aortega/received_events",
    "type": "User",
    "site_admin": false,
    "score": 1
}
  *
  * */
  return (
    <div
      className="rounded-md shadow bg-white p-4 mb-4 w-full"
    >

      <div
        className="flex-col sm:flex-row flex gap-2"
      >
        <div
          className="flex flex-col shrink justify-center items-center"
        >
          {!imageLoadError ? (
            <Image
              className="rounded-full flex"
              src={user.avatar_url}
              alt={user.login}
              width={80}
              height={80}
              onLoad={() => setImageLoadError(false)}
              onError={() => setImageLoadError(true)}
            />
          ) : (
            <Image
              className="rounded-full flex"
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
              alt={user.login}
              width={80}
              height={80}
            />
          )}

        </div>

        <div
          className="flex items-center sm:items-start max-w-full flex-col gap-1 text-sm text-black"
        >

          <div
            className="font-bold text-2xl"
          >
            {user.login}
          </div>

          <a
            href={user.html_url}
            className="text-blue-700"
          >
            {user.html_url}
          </a>

          <div
            className="flex flex-row flex-wrap text-justify gap-2 text-center font-semibold"
          >
            {userFollowers && (
            <div>
              {`Seguidores: ${userFollowers}`}
            </div>
            )}
            {userFollowing && (
            <div>
              {`Siguiendo: ${userFollowing}`}
            </div>
            )}
            {userRepos && (
            <div>
              {`Repositorios: ${userRepos}`}
            </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
