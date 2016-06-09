/**
 * Created by kfraser on 09/06/2016.
 */
export class Team {
  constructor(
    public id: string,
    public name: string,
    public genres: string[],
    public members: string[]
  ) {}
}
