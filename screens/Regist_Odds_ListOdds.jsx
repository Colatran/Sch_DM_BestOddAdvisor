import List_Odds from "../components/List_Odds";

export default function Regist_Odds_ListOdds({ route, navigation }) {
  const { game } = route.params;

  return (
    <List_Odds game={game} navigation={navigation}/>
  );
}