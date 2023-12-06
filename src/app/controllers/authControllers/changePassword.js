const db = require('../../../db/models/index');
const bcrypt = require('bcryptjs');

const changePassword = async (req, res, next) => {
  const { password_new, password_old } = req.body;

  // Tìm kiếm người dùng theo tên người dùng
  const user = await db.User.findOne({ where: { username: 'admin' } });
  if (!user) {
    return res.status(404).json({ message: 'Người dùng không tồn tại' });
  }

  // So sánh mật khẩu cũ
  const passwordMatch = await bcrypt.compare(password_old, user.password);

  if (!passwordMatch) {
    return res.status(201).json({ errcode: 1, message: 'Mật khẩu cũ không đúng' });
  }

  // Mã hóa mật khẩu mới và lưu vào danh sách người dùng
  const hashedPassword = await bcrypt.hash(password_new, 10);
  user.password = hashedPassword;

  await db.User.update(
    { password: hashedPassword },
    {
      where: {
        username: 'admin',
      },
    },
  )
    .then(() => {
      return res.status(201).json({ errcode: 0, message: 'Đã thay đổi mật khẩu thành công' });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = changePassword;
