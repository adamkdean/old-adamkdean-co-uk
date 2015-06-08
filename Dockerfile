FROM adamkdean/node
MAINTAINER Adam K Dean <adamkdean@googlemail.com>

RUN mkdir /var/adamkdean-co-uk
ADD . /var/adamkdean-co-uk
WORKDIR /var/adamkdean-co-uk

RUN npm install

ENV PORT 8000
EXPOSE 8000

CMD ["npm", "start"]
