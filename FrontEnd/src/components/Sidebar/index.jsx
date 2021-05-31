/* eslint-disable no-unused-vars */
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Button, Modal, Select, Input, Form } from 'antd';
import { TeamOutlined, FormOutlined } from '@ant-design/icons';
import { Dialogs } from '../../containers';

const { Option } = Select;
const { TextArea } = Input;

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
    <Option key={user.id}>{user.fullname}</Option>
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
        onCancel={onClose}
        footer={[
          <Button key="black" onClick={onClose}>
            Закрыть
          </Button>,
          <Button
            disabled={!messageText}
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
            <Select
              showSearch
              value={inputValue}
              placeholder="Найти пользователя"
              style={{ width: '100%' }}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              onSearch={onSearch}
              onChange={onChangeInput}
              onSelect={onSelectUser}
              notFoundContent={null}
            >
              {options}
            </Select>
          </Form.Item>

          {selectedUserId && (
            <Form.Item label="Введите текст сообщения">
              <TextArea
                placeholder=""
                autoSize={{ minRows: 3, maxRows: 10 }}
                onChange={onChangeTextArea}
                value={messageText}
              />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

Sidebar.defaultProps = {
  users: [],
};

export default Sidebar;
