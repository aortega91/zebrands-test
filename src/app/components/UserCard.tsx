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
  const [userRepos, setUserRepos] = useState(0);

  const [imageLoadError, setImageLoadError] = useState(false);

  const fetchRemoteData = (url:string) => fetch(url).then(
    (response) => response.json(),
  );

  useEffect(() => {
    fetchRemoteData(user.repos_url).then((data) => {
      setUserRepos(data.length);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            className="flex flex-row flex-wrap gap-2 text-center font-semibold"
          >
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
