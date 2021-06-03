import React from 'react';
import './UserOptions.scss';
const UserOptions = ({ users, selectedUsers, onSelectUser }) => {
  return (
    <>
      {selectedUsers.length
        ? selectedUsers.map((us) => (
            <div className={'userOption'} key={us.email}>
              <div>{us.name} </div>
              <div>
                <input
                  type={'checkbox'}
                  checked
                  onChange={() => onSelectUser(us)}
                />
              </div>
            </div>
          ))
        : null}

      {users.length
        ? users.map((us) =>
            !selectedUsers.find((u) => u.email === us.email) ? (
              <div className={'userOption'} key={us.email}>
                <div>{us.name}</div>
                <div>
                  <input
                    type={'checkbox'}
                    checked={false}
                    onChange={() => onSelectUser(us)}
                  />
                </div>
              </div>
            ) : null,
          )
        : null}
    </>
  );
};

export default UserOptions;
