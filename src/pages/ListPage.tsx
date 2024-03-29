import { useEffect } from "react";
import Category from "../components/ListPage/Category";
import { ListTitle } from "../components/ListPage/ListTitle";
import { WineList } from "../components/ListPage/WineList";
import { getWineList } from "../apis/listPage";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loadingState, pageNameState, pageState, titleState, wineListState } from "../store/atom";
import { Pagination } from "../components/ListPage/Pagination";
import { Loading } from "./common/Loading";

export const ListPage = () => {
  const [page, setPage] = useRecoilState(pageState);
  const setPageName = useSetRecoilState(pageNameState);
  const setTitle = useSetRecoilState(titleState);
  const setWineList = useSetRecoilState(wineListState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const ListPageRendering = async () => {
    try {
      const data = await getWineList("france", page);
      setTitle({ country: data.breadcrumbs[1].name, wine: data.breadcrumbs[0].slug });
      setWineList(data.items);
      setLoading(false);
    } catch {
      alert("server error");
      new Error("server error");
    }
  };
  useEffect(() => {
    setLoading(true);
    setPageName("list");
    ListPageRendering();
  }, [page]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <Category />
        <ListTitle />
        <WineList />
        <Pagination page={page} setPage={setPage} />
      </>
    );
  }
};
