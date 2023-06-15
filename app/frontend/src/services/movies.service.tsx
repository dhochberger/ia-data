import { Movie } from 'src/types/Movie';
import http from '../http-common';


class TutorialDataService {
  getAll() {
    return http.get<Array<Movie>>('/movies');
  }
  get(id: string) {
    return http.get<Movie>(`/movies/${id}`);
  }

}
export default new TutorialDataService();