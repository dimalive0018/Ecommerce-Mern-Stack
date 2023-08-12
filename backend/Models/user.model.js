const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String,
        trim: true,
        validate: {
            validator:
                function (name) {
                    return name.length >= 2;
                },
            message: "Name must be at least 2 characters long"
        }
    },
    surname: {
        type: String,
        trim: true,
        validate: {
            validator:
                function (surname) {
                    return surname.length >= 2;
                },
            message: "Surname must be at least 2 characters long"
        }
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        validate: {
            validator:
                function (email) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
                },
            message: "Invalid email"
        }
    },
    password: {
        type: String,
        validate: {
            validator: function (value) {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/.test(value);
            },
            message: props => `Password ${props.value} must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number and must not contain white spaces`
        }
    },
    phone: {
        type: String,
        unique: true,
        trim: true,
        validate: {
            validator: function (value) {
                return /^\d{10,15}$/.test(value);
            },
            message: props => `${props.value} is not a valid phone number`
        }
    },
    address: {
        type: String,
        trim: true,
        validate: {
            validator: function (address) {
                return /^.+,\s*.+,\s*.+,\s*.+,\s*\d{5}$/.test(address);
            },
            message: props => `${props.value} is not a valid address! Please enter address, apartment number, region, city, postal code`
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    secretQuestion: {
        type: String,
        trim: true
    },
    secretAnswer: {
        type: String,
        trim: true,
        validate: {
            validator:
                function (secretAnswer) {
                    return secretAnswer.length >= 2;
                },
            message: "Secret answer must be at least 2 characters long"
        }
    },
    newPassword: {
        type: String,
        validate: {
            validator: function (value) {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/.test(value);
            },
            message: props => `Password ${props.value} must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number and must not contain white spaces`
        }
    },
}, { timestamps: true });

userSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;