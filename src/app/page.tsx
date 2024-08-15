import Header from '@components/Header/Header';
import PomidoroContent from '@components/Pomidoro/Pomidoro';
import '@styles/global.scss';

export default function Home() {
    return (
        <>
            <Header />
            <PomidoroContent />
        </>
    );
}
