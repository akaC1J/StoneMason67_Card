from flask import Flask, request

app = Flask(__name__)


@app.route("/")
def index():
    return "Congratulations, it's a web app!"


@app.route('/submit_form', methods=['POST'])
def submit_form():
    form_data = {
        "name": request.form.get('name'),
        "contact_method": request.form.get('contact_method'),
        "contact": request.form.get('contact'),
        "message": request.form.get('message')
    }

    # Теперь вы можете обработать эти данные как вам нужно
    # Например, вы можете сохранить их в базе данных или отправить по электронной почте

    return "Form submitted successfully!"


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)
