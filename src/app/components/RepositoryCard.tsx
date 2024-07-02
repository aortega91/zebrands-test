import Image from 'next/image';
import { useState } from 'react';
import { PRIMARY_COLOR } from '@/src/utils/constants';

export type TRepository = {
  id: number;
  name: string;
  html_url: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  language: string;
  forks: number;
  watchers: number;
}
type TRepositoryCardProps = {
  repository: TRepository;

}

export default function RepositoryCard({ repository }: TRepositoryCardProps) {
  const [imageLoadError, setImageLoadError] = useState(false);

  return (
    <div
      className="rounded-md shadow bg-white p-4 mb-4 w-full"
    >

      <div
        className="flex-col sm:flex-row flex gap-2"
      >

        <div
          className="flex items-center sm:items-start max-w-full flex-col gap-1 text-sm text-black"
        >

          <div
            className="font-bold text-3xl"
          >
            {repository.name}
          </div>

          <a
            href={repository.html_url}
            className="text-blue-700"
          >
            {repository.html_url}
          </a>

          <div className="my-2 font-semibold text-center sm:text-start">
            {repository.description}
          </div>

          <div
            className="flex flex-col flex-wrap gap-1  font-semibold"
          >

            <a
              href={repository.owner.html_url}
              className="flex flex-row gap-1 shrink text-start items-center"
            >

              Autor:
              {!imageLoadError ? (
                <Image
                  className="rounded-full flex"
                  src={repository.owner.avatar_url}
                  alt={repository.owner.login}
                  width={24}
                  height={24}
                  onLoad={() => setImageLoadError(false)}
                  onError={() => setImageLoadError(true)}
                />
              ) : (
                <Image
                  className="rounded-full flex"
                  src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                  alt={repository.owner.login}
                  width={24}
                  height={24}
                />
              )}

              <div
                style={{ color: PRIMARY_COLOR }}
              >
                {repository.owner.login}
              </div>

            </a>

            {repository.language && (
            <div>
              Lenguaje:
              {' '}
              {repository.language}
            </div>
            )}

            <div
              className="flex flex-row gap-3"
            >
              <div>
                Forks:
                {' '}
                {repository.forks}
              </div>
              <div>
                Watchers:
                {' '}
                {repository.watchers}
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
