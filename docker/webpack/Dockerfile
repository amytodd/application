# Use oficial Ruby 2.5.1
FROM ruby:2.5.1
# Install dependencies:
# - build-essential: To ensure certain gems can be compiled
# - nodejs: Compile assets
# - yarn: Install & manage node modules [should make npm obsolete]
# - libpq-dev
# - libxml2-dev libxslt1-dev for nokogiri
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    apt-get install -qq -y build-essential \
    nodejs \
    yarn \
    libpq-dev \
    libxml2-dev \
    libxslt1-dev
# Create unprivileged user, prosaically called app
RUN useradd --user-group --create-home --shell /bin/sh app
ENV HOME=/home/app
# Create known_hosts
RUN mkdir -p $HOME/.ssh && touch $HOME/.ssh/known_hosts
# Add bitbuckets key
RUN ssh-keyscan bitbucket.org >> $HOME/.ssh/known_hosts
RUN ssh-keyscan github.com >> $HOME/.ssh/known_hosts
# Copy files into the container
COPY ./src/Gemfile ./src/Gemfile.lock $HOME/lol/
COPY ./src/package.json ./src/yarn.lock $HOME/lol/
COPY ./docker-key $HOME/.ssh/id_rsa
# Chown copies files
RUN chown -R app:app $HOME && chmod 600 $HOME/.ssh/id_rsa
#ENV BUNDLE_PATH /gems
# Set working directory
WORKDIR $HOME/lol
USER app
RUN bundle install
