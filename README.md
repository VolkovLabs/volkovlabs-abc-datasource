# Template to create a new Grafana data source plugin

![Datasource](https://github.com/VolkovLabs/volkovlabs-abc-datasource/raw/main/src/img/datasource.png)

![Grafana 10](https://img.shields.io/badge/Grafana-10.0.0-orange)
![CI](https://github.com/volkovlabs/volkovlabs-abc-datasource/workflows/CI/badge.svg)
![E2E](https://github.com/volkovlabs/volkovlabs-abc-datasource/workflows/E2E/badge.svg)
[![codecov](https://codecov.io/gh/VolkovLabs/volkovlabs-abc-datasource/branch/main/graph/badge.svg?token=2W9VR0PG5N)](https://codecov.io/gh/VolkovLabs/volkovlabs-abc-datasource)
[![CodeQL](https://github.com/VolkovLabs/volkovlabs-abc-datasource/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/VolkovLabs/volkovlabs-abc-datasource/actions/workflows/codeql-analysis.yml)

## Introduction

The Abc Data Source is a template we created to streamline our development process and gladly share with the Grafana community.

To make the creation process efficient, starting with a well-constructed template is always easier.

Generate a template with [https://github.com/VolkovLabs/volkovlabs-abc-datasource/generate](https://github.com/VolkovLabs/volkovlabs-abc-datasource/generate).

## Requirements

- **Grafana 9**, and **Grafana 10** are required for major version 3.
- **Grafana 8.5+** and **Grafana 9** are required for major version 2.
- **Grafana 8** is required for major version 1.

## Getting Started

1. Install packages

```bash
npm install
```

2. Build the plugin

```bash
npm run build
```

3. Sign the plugins if required

```bash
export GRAFANA_API_KEY=erfdfsgfs==
npm run sign
```

4. Start the Docker container

```bash
npm run start
```

## Highlights

- Use `docker-compose` to start the development environment with provisioned data source and a dashboard.
- Provides unit and E2E test configuration.
- Based on the latest version of Grafana and Grafana Tools.
- Includes GitHub Actions for CI, E2E and Release.

## Support

- Subscribe to our [YouTube Channel](https://www.youtube.com/@volkovlabs) and add a comment.
- Premium tier support for the development plugins is available via [GitHub Sponsor](https://github.com/sponsors/VolkovLabs).

## License

Apache License Version 2.0, see [LICENSE](https://github.com/volkovlabs/volkovlabs-abc-datasource/blob/main/LICENSE).
