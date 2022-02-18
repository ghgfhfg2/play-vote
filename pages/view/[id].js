import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';
import { db } from "src/firebase";
import { ref, onValue, off, runTransaction, update } from "firebase/database";
import { Input, message, Button } from "antd";
import ViewCon from "@component/ViewCon";
import { RiArrowGoBackLine } from "react-icons/ri"
const { Search } = Input;


export default function View() {
  const userInfo = useSelector((state) => state.user.currentUser);
  const router = useRouter();
  const uid = router.query.id

  const [roomData, setRoomData] = useState();
  const [pwEnter, setPwEnter] = useState(true);
  useEffect(() => {
    const listRef = ref(db, `list/${uid}/`)
    onValue(listRef, data=>{
      setRoomData({
        ...data.val(),
        uid
      })
    });

    runTransaction(ref(db, `list/${uid}/join_count`), pre => {
      return pre ? pre+1 : 1;
    })

    return () => {
      off(listRef)
    };
  }, [pwEnter]);
  
  const onSearch = (e) => {
    const pw = roomData.password
    if(e == pw){
      setPwEnter(false);
      message.success('입장에 성공했습니다 :)')
    }else{
      message.error('암호가 틀렸습니다.');
    }
  }

  const onBack = () => {
    router.back()
  }
  
  return (
    <>
      {roomData && (
        <>
        {roomData.password && pwEnter ? (
          <>
            <div className="content_box pw_box">
              <Search
              placeholder="암호를 입력하세요" 
              onSearch={onSearch} 
              enterButton 
              />
              <Button className="back" onClick={onBack}><RiArrowGoBackLine />돌아가기</Button>
            </div>
          </>
          ):(
          <>  
             <ViewCon uid={uid} />
          </>
          )}
        </>
        )
      }
    </>
  );
}
