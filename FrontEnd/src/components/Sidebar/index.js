/* eslint-disable no-unused-vars */
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Button, Modal, Select } from 'antd';
import { TeamOutlined, FormOutlined } from '@ant-design/icons';
import { Dialogs } from '../../containers';

const Sidebar = ({
  user,
  visible,
  inputValue,
  messageText,
  selectedUserId,
  isLoading,
  users,
  onShow,
  onClose,
  onSearch,
  onChangeInput,
  onSelectUser,
  onChangeTextArea,
  onModalOk,
}) => {
  const options = users.map((user) => (
    <Select.Option key={user.id}>{user.fullname}</Select.Option>
  ));
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
        <Dialogs userId={user && user.id} />
      </div>
      <Modal
        title="Создать диалог"
        visible={visible}
        onOk={onClose}
        onCancel={onClose}
      >
        <Select
          mode="multiple"
          placeholder="Inserted are removed"
          value={inputValue}
          onSearch={onSearch}
          onChange={onChangeInput}
          style={{ width: '100%' }}
          showSearch
        >
          {options}
        </Select>
      </Modal>
    </div>
  );
};

Sidebar.defaultProps = {
  users: [],
};

export default Sidebar;
