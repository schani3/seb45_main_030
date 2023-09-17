import ImageItem from "./ImageItem";
import styles from "./ImageList.module.css";
import useInfiniteGetImage from "../../hooks/useInfiniteGetImage";
import axios from "axios";
import { useEffect, useState } from "react";

// 로그인 상태 확인 기능
// import { useRecoilValue } from "recoil";
// import { loginState } from "../state/LoginState";
// const loginInfo = useRecoilValue(loginState);

function ImageList({ url, page }) {
    // 북마크 했던 게시물 상태: 0,1,2번 게시물로 임시 하드코딩
    const [bookmarkedPostId, setBookmarkedPostId] = useState([0, 1, 2]);
    const [recommendedPostId, setRecommendeddPostId] = useState([3, 4, 5]);

    // 무한 스크롤 훅
    const config = {
        params: {
            page: page,
        },
    };
    const { fetchedData, sentinelRef } = useInfiniteGetImage(url, config);

    const [columnState, setColumnState] = useState({ first: [], second: [], third: [] });

    useEffect(() => {
        ImageDistributer();
    }, [fetchedData]);

    // 추천 get 통신
    const getRecommmend = async () => {
        try {
            const response = await axios.get(`1`);
            const data = await response.data;

            // 서버의 추천여부를 화면에 적용한다.
            // if (postId === data.post_id) {
            //     setIsBookmarked(true);
            // } else {
            //     setIsBookmarked(false);
            // }
        } catch (error) {
            console.error(error.code, "추천 정보 get 실패");
        }
    };

    //북마크 get 통신
    const getBookmark = async () => {
        try {
            const response = await axios.get(`https://07bb-183-107-174-160.ngrok-free.app/bookmarks/1`, {
                headers: {
                    "ngrok-skip-browser-warning": true,
                },
            });
            const data = await response.data;

            setBookmarkedPostId(data.map((el) => el.post_id));
        } catch (error) {
            console.error(error.code, "북마크 정보 get 실패");
        }
    };

    //이미지 분배 로직
    const ImageDistributer = () => {
        // fetchedData를 map을 사용하여 새로운 배열으로 변환
        const stock = { first: [], second: [], third: [] };
        fetchedData.forEach((el, idx) => {
            if (idx % 3 === 0) {
                stock.first.push(el);
            } else if (idx % 3 === 1) {
                stock.second.push(el);
            } else {
                stock.third.push(el);
            }
        });
        // // stack 배열을 초기값으로 사용하여 columnState 업데이트
        setColumnState((prevState) => {
            return {
                first: [...prevState.first, ...stock.first],
                second: [...prevState.second, ...stock.second],
                third: [...prevState.third, ...stock.third],
            };
        });
    };
    // ImageItem 컴포넌트 렌더링
    const RenderImageItem = ({ column }) => {
        // columnState의 객체의 key의 수 만큼 ImageItem을 렌더링하면 반응형도 가능할 듯
        return (
            <div className={styles.column_grid}>
                {column.map((el) => {
                    return (
                        <ImageItem
                            key={el.id}
                            id={el.id}
                            width={el.width}
                            height={el.height}
                            isMarked={{
                                recommend: recommendedPostId.includes(Number(el.id)),
                                bookmark: bookmarkedPostId.includes(Number(el.id)),
                            }}
                        />
                    );
                })}
            </div>
        );
    };
    return (
        <>
            <section className={styles.container}>
                <div className={styles.top_grid}>
                    <RenderImageItem column={columnState.first} />
                    <RenderImageItem column={columnState.second} />
                    <RenderImageItem column={columnState.third} />
                </div>
            </section>
            <div className={styles.ht1r} ref={sentinelRef}></div>
        </>
    );
}
export default ImageList;