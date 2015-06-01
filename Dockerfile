FROM adamkdean/nodejs
MAINTAINER Adam K Dean

# Add source files
RUN mkdir /var/adamkdean-co-uk
ADD . /var/adamkdean-co-uk
WORKDIR /var/adamkdean-co-uk

# Install dependencies
RUN npm install

ENV PORT 8000
EXPOSE 8000

# Go!
CMD "node --harmony server/index.js"