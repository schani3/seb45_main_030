import ImageList from "../components/Image/ImageList";
import styles from "./MainPage.module.css";
function MainPage() {
    const Banner = () => {
        return (
            <section className={styles.banner}>
                <div>
                    <h1>Lorem, ipsum</h1>
                    <label htmlFor="banner_input">
                        <p>가까운 멋진 장소를 찾아보세요.</p>
                    </label>
                    <input id="banner_input" type="text" />
                </div>
            </section>
        );
    };
    const Welcome = () => {
        // 위치정보가 있으면 인근 뷰포인트
        // 없으면 인기 뷰포인트
        return (
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" height="96" viewBox="0 -960 960 960" width="96">
                    <path d="M480-360q56 0 101-27.5t71-72.5q-35-29-79-44.5T480-520q-49 0-93 15.5T308-460q26 45 71 72.5T480-360Zm0-200q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0 374q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
                </svg>
                <p>뷰포인트</p>
            </div>
        );
    };
    return (
        <>
            <header>헤더 컴포넌트</header>
            <Banner />
            <Welcome />
            <ImageList />
        </>
    );
}
export default MainPage;
