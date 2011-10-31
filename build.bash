#paths
pt_src=src/
pt_game=${pt_src}game/
    pt_entities=${pt_game}entities/
pt_core=${pt_src}core/
    pt_mixins=${pt_core}mixins/
pt_temp=".temp/"

pt_test="src-test/"

#create temporary folder for all intermediate representations of the src
mkdir $pt_temp

#intermediate build steps
    
    #build core
    cat ${pt_mixins}position.js ${pt_mixins}graphics.js ${pt_mixins}movement.js > ${pt_temp}mixins.js
    cat ${pt_core}header.js ${pt_core}mixin.js ${pt_core}game.js ${pt_core}images.js ${pt_temp}mixins.js ${pt_core}footer.js > ${pt_temp}core.js

    #build game
    cat ${pt_entities}* > ${pt_temp}entities.js
    cat ${pt_temp}entities.js ${pt_game}main.js > ${pt_temp}game.js
    
    #cat files for test
    cat ${pt_temp}core.js ${pt_temp}game.js > ${pt_test}treeroots.test.js

    #cat files for production
    cat ${pt_temp}core.js ${pt_game}boilerplate/header.js ${pt_temp}game.js ${pt_game}boilerplate/footer.js > treeroots.js

#remove the intermediate entities file created
rm -r $pt_temp