function validateCart(
  name = "",
  phoneNumber = "",
  address = "",
  district = ""
) {
  let errors = [];

  if (name?.length === 0) {
    errors = [...errors, "name"];
  }

  if (phoneNumber?.length === 0 || phoneNumber?.length !== 10) {
    errors = [...errors, "phoneNumber"];
  }

  if (address?.length === 0) {
    errors = [...errors, "address"];
  }

  if (district?.length === 0) {
    errors = [...errors, "district"];
  }
  return errors;
}

function validateRegister(props) {
  // we are going to store errors for all fields
  // in a signle array
  const {
    fullName,
    username,
    password,
    email,
    phoneNumber,
    district,
    address,
    passwordConfirm,
  } = props;
  const errors = [];

  // fullName
  if (fullName?.length === 0) {
    errors.push({
      name: "fullName",
      error: "Vui lòng nhập tên đầy đủ",
    });
  }

  // username
  if (username?.length === 0) {
    errors.push({ name: "username", error: "Vui lòng nhập tên đăng nhập" });
  }

  // phoneNumber

  if (phoneNumber?.length !== 10) {
    errors.push({ name: "phoneNumber", error: "Số điện thoại không hợp lệ" });
  }

  if (phoneNumber?.length === 0) {
    errors.push({
      name: "phoneNumber",
      error: "Vui lòng nhập số điện thoại",
    });
  }

  // password
  if (password?.length < 6) {
    errors.push({ name: "password", error: "Mật khẩu tối thiểu cần 6 kí tự" });
  }

  if (passwordConfirm !== password) {
    errors.push({ name: "passwordConfirm", error: "Mật khẩu không khớp" });
  }

  // email
  if (email?.split("")?.filter((x) => x === "@")?.length !== 1) {
    errors.push({ name: "email", error: "Email phải bao gồm kí tự '@'" });
  }
  if (email?.indexOf(".") === -1) {
    errors.push({ name: "email", error: "Email phải bao gồm kí tự '.'" });
  }

  if (email?.length < 5) {
    errors.push({ name: "email", error: "Email tối thiểu cần 5 kí tự" });
  }

  //address
  if (address?.length === 0) {
    errors.push({ name: "address", error: "Vui lòng nhập địa chỉ " });
  }

  if (district?.length === 0) {
    errors.push({ name: "district", error: "Vui lòng chọn quận/huyện" });
  }

  return errors.reduce((arr, err) => {
    if (arr.findIndex((a) => a.name === err.name) !== -1) {
      arr.at(arr.findIndex((a) => a.name === err.name)).error = err.error;
      return arr;
    } else {
      return [...arr, err];
    }
  }, []);
}

export { validateCart, validateRegister };
