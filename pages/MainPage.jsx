import { useEffect } from "react";
import Hero from '../components/Hero'
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../redux/actionTypes";
import { getPopular } from "../redux/actions/movieActions";
import { getGenres } from "../redux/actions/movieActions";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";


const MainPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store);

  useEffect(() => {
    // filmler için yükleniyor state'ini aktif eden aksiyon
    dispatch({ type: actionTypes.SET_MOVIES_LOADING });

    // popüler filmleri al ve store a aktar
    dispatch(getPopular());

    // türleri al ve store a aktar
    dispatch({ type: actionTypes.SET_GENRES_LOADING });
    dispatch(getGenres());
  }, []);

  return (
    <div>
      {/* karşılama komp. */}
      <Hero />

      {/*
       önce yükleniyor mu kontrol et
       yükleniyorsa loading bileşenini ekrana bas
       yüklenme bittiyse hata var mı kontrol et
       hata avarsa ekrana mesaj bas
       hata yoka her bir kategori için ekrana o kategorinin
       filmlerini basıcak bileşeni ekrana bas
      */}
      {state.isGenresLoading ? (
        <Loading />
      ) : state.isGenresError ? (
        <p>Üzgünüz Hata Oluştu :/</p>
      ) : (
        state.genres.map((genre) => (
        <MovieList  key={genre.id} genre={genre}/>
      ))
      )}

    </div>
  );
};

export default MainPage