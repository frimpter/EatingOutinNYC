# GROUP 2 PROJECT 2 - FLASK SETUP


from flask import Flask


nyc_app = Flask(__name__)


@nyc_app.route("/")
def home():
    return render_template("index.html")


if __name__ == "__main__":
    nyc_app.run(debug=True)