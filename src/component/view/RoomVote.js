import React from 'react';
import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";
import { IoIosList } from "react-icons/io";
import { FiExternalLink } from "react-icons/fi";
import { Button, Image } from "antd";
import style from "styles/view.module.css";

function RoomVote({
  userInfo,
  roomData,
  scrollBox,
  voteListData,
  listRef,
  voterRef,
  viewVoterList,
  onVote}) {
  return (
      <ul className={style.vote_list} ref={scrollBox}>
      {voteListData && voteListData.map((el,idx)=>(
        <li
        key={idx}
        ref={list=>listRef.current[idx] = list}
        data-uid={el.uid}
        >
          <div className={style.profile}>
            {roomData && roomData.sender && roomData.sender === 1 &&
              <span>{el.user_name}</span>
            }
            <span className={style.date}>{`${el.date.hour}:${el.date.min}`}</span>
          </div>
          <div className={style.con}>
            <div className={style.desc} style={roomData?.ing ? {marginRight:"10px"} : {}}>
              <span className={style.vote_tit}>{el.title}</span>
              {el.image &&
              <div className="vote_img_list">
                <Image.PreviewGroup>
                  {el.image.map((src,idx)=>(
                    <>
                    <Image key={idx} className={style.vote_img} src={src} />
                    </>
                    ))
                  }
                </Image.PreviewGroup>
              </div>
              }
              {el.link &&
              <span className={style.vote_link}>
                <a href={el.link} target="_blank">링크이동<FiExternalLink /></a>
              </span>
              }                
            </div>
            <div className={style.right_con}>                
              {roomData && roomData.ing &&
              <div className={style.btn_box}>
                <span className={style.count}>
                  {el.vote_count > 0 ? <>{el.vote_count}</> : `0`}
                </span>
                {userInfo && 
                <Button className={style.btn_vote} onClick={()=>{onVote(el.uid,el.user_uid,el.vote_user,el.already_check)}}>
                  
                  {el.already_check ? (
                    <AiTwotoneLike className={style.ic_vote} />
                  ) : (
                    <AiOutlineLike className={style.ic_vote} />
                  )
                  }
                </Button>
                }
              </div>
              }
              {roomData && roomData.voter === 1 && 
                <>
                  <button type='button' className={style.btn_vote_list_view} onClick={()=>{viewVoterList(idx)}}>
                    <IoIosList />
                    목록
                  </button>
                  <ul style={{display:"none"}} ref={voter => voterRef.current[idx] = voter}>
                    {el.user_uid.map((user,idx2)=>(
                      <li>{idx2+1} {user.name}</li>
                    ))}
                  </ul>    
                </> 
              }         
            </div>
          </div>
        </li>
      ))}
    </ul>    
  )
}

export default RoomVote