# concat all treeroots files together

#path to source
pts="src/"

#path to entities
ptes="src/entities/"

#cat files
cat ${ptes}* > ${pts}entities.js
cat ${pts}header.js ${pts}game.js ${pts}entity.js ${pts}entities.js ${pts}main.js ${pts}footer.js > treeroots.js

#scripts to build the right ender modules

#path to ender
pte="../../ender/"
ender build ${pte}flywheel ${pte}clash bean bonzo