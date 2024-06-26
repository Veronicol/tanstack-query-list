import { useNavigate, useParams } from 'react-router-dom';

import { PodcastResumeCard } from '../components';
import { useGetPodcastDetail } from '../hooks';

export const PodcastDetail = () => {
  const { podcastId } = useParams();
  const navigate = useNavigate();

  const { data: podcastDetail, isLoading } = useGetPodcastDetail(
    podcastId || ''
  );

  const navigateToEpisode = (episodeId: string) =>
    navigate(`/podcast/${podcastId}/episode/${episodeId}`);

  return (
    <>
      {!isLoading && (
        <div className="detail-container">
          {podcastDetail ? (
            <>
              <PodcastResumeCard />
              <div className="episodes-container">
                <div className="episodes-counter box">
                  Episodes: {podcastDetail.episodesCount}
                </div>
                <div className="episodes-list box">
                  <div className="episode-row">
                    <div className="title bold">Title</div>
                    <div className="date bold">Date</div>
                    <div className="date bold">Duration</div>
                  </div>
                  {podcastDetail.episodes.map((episode, index) => {
                    const { id, title, date, duration } = episode;
                    return (
                      <div
                        key={id}
                        className={`episode-row${index % 2 ? ' ' : ' row-shadow'}`}
                      >
                        <div
                          className="title title-clickable"
                          onClick={() => navigateToEpisode(id)}
                        >
                          {title}
                        </div>
                        <div className="date">{date}</div>
                        <div className="date">{duration}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div>Ooops... detail not available</div>
          )}
        </div>
      )}
    </>
  );
};
