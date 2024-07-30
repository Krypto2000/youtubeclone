import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";
import { clearVideos } from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getHomePageVideos } from "../store/reducers/getHomePageVideos";
import { HomePageVideos } from "../Types";

export default function Home() {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);

  useEffect(() => {
    return () => {
      dispatch(clearVideos());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getHomePageVideos(false));
  }, [dispatch]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="h-16">
        <Navbar />
      </div>
      <div className="flex flex-1">
        <div className="hidden md:block md:w-64">
          <Sidebar />
        </div>
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {videos.length ? (
            <InfiniteScroll
              dataLength={videos.length}
              next={() => dispatch(getHomePageVideos(true))}
              hasMore={videos.length < 500}
              loader={<Spinner />}
              height={650}
            >
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {videos.map((item: HomePageVideos) => (
                  <Card data={item} key={item.videoId} />
                ))}
              </div>
            </InfiniteScroll>
          ) : (
            <Spinner />
          )}
        </main>
      </div>
    </div>
  );
}
