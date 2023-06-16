//const apiKey = 'f040ecfc198eecfc2bb7c2e230b2ddbc';
//const apiKey = '82758ce4186899178083c4767081e974';
//const apiKey = '4542694384355cbe59886ad455c6d672';
//const apiKey = '39c2e419fff9d586d07ffc18469c678c';
//const apiKey = '8cd0ec62706715af233200e193d24655';
//const apiKey = 'd0db69a941fdc03357aa208bf42d56bc';
//const apiKey = '56c7e4ded469ad85326d66b5ecaf7033';
//const apiKey = '56c7e4ded469ad85326d66b5ecaf7033';
//const apiKey = '2acf5f512c27267cd7de0f779de9c66d';
//const apiKey = 'baee82fd681123b4c5f4f591feb9d130';
//const apiKey = 'acf62fbe430dd42e258f4c074a0c9ea9';
//const apiKey = '6e257ea11c32b80ae9e47bda140edb6f';
//const apiKey = '66b669d7d94892d96b301c87b2faaf46';
//const apiKey = 'a20917caf62c6b1e57b9b713d814c103';
//const apiKey = 'ad915fa822eda7454b7e53bb608dc9af';
//const apiKey = 'e3dad176fd019f84fcc46fe14547c3e0';
//const apiKey = '15c6f87c09331a1c594203c44c5aca90';
//const apiKey = '15c6f87c09331a1c594203c44c5aca90';
//const apiKey = 'e55999bfc086af58153b69c5c8d844d8';
const apiKey = '5b6a6f8268f5dfe754579a293f1239d1';



const regions = ['us', 'us2', 'au', 'uk', 'eu'];



export const linkLeagues = `https://api.the-odds-api.com/v4/sports/?apiKey=${apiKey}`;
export const linkGames = (sport, markets) => { return `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${apiKey}&regions=${regions.toString()}&markets=${markets.toString()}`; }
export const linkOdds = (sport, markets, gameId) => { return `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${apiKey}&regions=${regions.toString()}&markets=${markets.toString()}&eventIds=${gameId}`; }