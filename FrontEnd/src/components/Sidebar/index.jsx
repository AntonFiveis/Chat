/* eslint-disable no-unused-vars */
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Button, Modal, Select, Input, Form } from 'antd';
import { TeamOutlined, FormOutlined } from '@ant-design/icons';
import { Dialogs } from '../../containers';

const { Option } = Select;
const { TextArea } = Input;

const UserOptions = ({ users, selectedUsers, onSelectUser, user }) => {
  return (
    <>
      {selectedUsers.length
        ? selectedUsers.map((us) => (
            <div key={us.email}>
              <p>
                {us.name}{' '}
                <input
                  type={'checkbox'}
                  checked
                  onChange={() => onSelectUser(us)}
                />
              </p>
            </div>
          ))
        : null}

      {users.length
        ? users.map((us) =>
            !selectedUsers.find((u) => u.email === us.email) ? (
              <div key={us.email}>
                <p>
                  {us.name}
                  <input
                    type={'checkbox'}
                    checked={false}
                    onChange={() => onSelectUser(us)}
                  />
                </p>
              </div>
            ) : null,
          )
        : null}
    </>
  );
};

const Sidebar = ({
  user,
  visible,
  inputValue,
  messageText,
  selectedUsers,
  isLoading,
  users,
  onShow,
  onClose,
  onChangeInput,
  onSelectUser,
  onChangeTextArea,
  onModalOk,
}) => {
  return (
    <div className="chat__sidebar">
      <div className="chat__sidebar-header">
        <div>
          <TeamOutlined shape="circle" />
          <span>Список диалогов</span>
        </div>
        <Button
          onClick={onShow}
          type="link"
          shape="circle"
          icon={<FormOutlined />}
        />
      </div>
      <div className="chat__sidebar-dialogs">
        <Dialogs userEmail={user && user.email} />
      </div>
      <Modal
        title="Создать диалог"
        visible={visible}
        onCancel={onClose}
        footer={[
          <Button key="black" onClick={onClose}>
            Закрыть
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isLoading}
            onClick={onModalOk}
          >
            Создать
          </Button>,
        ]}
      >
        <Form className="add-dialog-form">
          <Form.Item label="Введите имя пользователя или E-Mail">
            <input
              value={inputValue}
              onChange={onChangeInput}
              placeholder={'Найти пользователя'}
              style={{ width: '100%' }}
            />
            <UserOptions
              users={users}
              selectedUsers={selectedUsers}
              onSelectUser={onSelectUser}
            />
          </Form.Item>

          {/*{selectedUserId && (*/}
          {/*  <Form.Item label="Введите текст сообщения">*/}
          {/*    <TextArea*/}
          {/*      placeholder=""*/}
          {/*      autoSize={{ minRows: 3, maxRows: 10 }}*/}
          {/*      onChange={onChangeTextArea}*/}
          {/*      value={messageText}*/}
          {/*    />*/}
          {/*  </Form.Item>*/}
          {/*)}*/}
        </Form>
      </Modal>
    </div>
  );
};

Sidebar.defaultProps = {
  users: [],
};

export default Sidebar;
