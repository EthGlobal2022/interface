import Link from "next/link";
import styles from "styles/cards.module.css";

const UserCard = ({ user }) => {
  return (
    <div className={styles.card} style={{ margin: "12px 0px" }}>
      <a href={user.url} target="_blank">
        <div className={styles.container}>
          <h4>
            <b>{user.title}</b>
          </h4>
        </div>
      </a>
    </div>
  );
};

/*
const UserCard = ({user}) => {
    return (
    <div className={styles.card}>
    <img src={user.avatar} alt="Avatar" style={{width: '100%'}} />
    <div className={styles.container}>
    <h4><b>{user.first_name} {user.last_name}</b></h4>
    <p>{user.email}</p>
    </div>
    </div>
    );
    }
*/

export default UserCard;
