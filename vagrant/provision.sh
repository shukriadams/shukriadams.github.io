#!/usr/bin/env bash
sudo apt-get update

# install git
sudo apt-get install git -y

#install node js
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install nodejs  -y

sudo npm install -g grunt

# after copying keys from provisioning step in vagrantfile, mark as private again
sudo cp ~/temp_xfer/id_rsa ~/.ssh/id_rsa
sudo cp ~/temp_xfer/known_hosts  ~/.ssh/known_hosts
sudo cp ~/temp_xfer/.gitconfig  ~/.gitconfig
sudo chmod 700 -R /home/vagrant/.ssh

# force startup folder to /src folder in project
echo "cd /vagrant/src" >> /home/vagrant/.bashrc

