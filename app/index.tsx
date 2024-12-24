import { Redirect } from 'expo-router';

const Home = () => {
    return <Redirect href={'/(root)/(auth)/welcome'} />
}

export default Home;
