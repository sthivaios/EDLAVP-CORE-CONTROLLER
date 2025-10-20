# EDLAVP-CORE-CONTROLLER

Note that this readme sucks because this repo is in incredibly early stages still lol.

The EDLAVP-CORE-CONTROLLER is the core of the controller for the EDLAVP project. It handles messaging between the server
and the stations, logging, alerting, and of course storing the data.

If you do not know what EDLAVP is, you probably don't need to be here. I'll release more documentation and info on
EDLAVP at some point.

This project is in very early stages but it is going to be deployed as a Docker image. It uses the ExpressJS framework
for the REST API, Drizzle as the ORM, ESLint, and MQTT.js for MQTT stuff.

## Contributing

I'm not expecting anyone to contribute to this project, I'm just making this repo public in case anyone wants to play
with it.
If you do wish to contribute, you are very welcome to do so. You should create an issue for bugs or suggestions, and if
you want to
work on that issue yourself, feel free to fork and open a PR referencing the issue.

See [LICENSE](LICENSE) for more.

## License

EDLAVP-CORE-CONTROLLER is licensed under the Mozilla Public License Version 2.0.
See the [LICENSE](./LICENSE) file for details.