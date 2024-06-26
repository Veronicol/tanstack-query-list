import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { PodcastCard } from '../components';
import { useGetPodcastList } from '../hooks';
import type { PodcastListItem } from '../models';
import { getMatchingElements } from '../utils';

export const PodcastList = () => {
  const navigate = useNavigate();

  const [filteredList, setFilteredList] = useState<PodcastListItem[]>([]);

  const { data: resPodcastList } = useGetPodcastList();
  const podcastList = resPodcastList || [];

  useEffect(() => {
    podcastList.length && setFilteredList(podcastList);
  }, [podcastList]);

  const onFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value: filterValue } = event.target;
    const matchingPodcasts = getMatchingElements(podcastList, filterValue);
    setFilteredList(matchingPodcasts);
  };

  const onClickCard = (podcastId: string) => navigate(`/podcast/${podcastId}`);

  return (
    <div className="podcast-list-container">
      {!!podcastList.length && (
        <>
          <div className="filter-container">
            <div className="filter-counter">{filteredList.length}</div>
            <input
              type="text"
              placeholder="Filter podcasts..."
              onChange={onFilterChange}
            />
          </div>
          <div className="card-container">
            {filteredList.length ? (
              filteredList.map((currentPodcast) => {
                return (
                  <PodcastCard
                    key={currentPodcast.id}
                    podcast={currentPodcast}
                    onPodcastSelect={onClickCard}
                  />
                );
              })
            ) : (
              <div>No results found</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
