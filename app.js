#! node
var fs = require('fs');
var path = require('path');
// 文件+目录
let fileCount = 0
// 关闭数
let closeCount = 0
// 目录数
let dirCount = 0
// 项目名称
let prjectName = ''

/**
 * 拷贝文件
 * @param srcPath
 * @param tarPath
 * @param cb
 */
function copyFile(srcPath, tarPath, cb) {
    var rs = fs.createReadStream(srcPath);
    rs.on('error', function (err) {
        if (err) {
            console.log('读文件错误', srcPath);
        }
        cb && cb(err);
    })

    var ws = fs.createWriteStream(tarPath);
    ws.on('error', function (err) {
        if (err) {
            console.log('写文件错误', tarPath);
        }
        cb && cb(err);
    })
    ws.on('close', function (ex) {
        cb && cb(ex);
        closeCount++
        if (closeCount === fileCount - 1 - dirCount) {
            rmdir(`./${prjectName}/node_modules`, () => {
                console.log('项目初始化完成！！！')
                console.log('执行npm install 进行安装依赖！！！')
            })
        }
    })
    rs.pipe(ws);
}

/**
 * 拷贝目录
 * @param srcDir
 * @param tarDir
 * @param cb
 */
//! 将srcDir文件下的文件、文件夹递归的复制到tarDir下
function copyDir(srcDir, tarDir, cb) {
    fs.readdir(srcDir, function(err, files) {
        fileCount+=files.length
        var count = 0;
        var checkEnd = function() {
            ++count === files.length && cb && cb();
        }

        if (err) {
            checkEnd();
            return;
        }

        files.forEach(function(file) {
            var srcPath = path.join(srcDir, file);
            var tarPath = path.join(tarDir, file);

            fs.stat(srcPath, function(err, stats) {
                if (stats.isDirectory()) {
                    dirCount++
                    console.log('创建目录和文件中,请稍后...');
                    fs.mkdir(tarPath, function(err) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        copyDir(srcPath, tarPath, checkEnd);
                    });

                } else {
                    if (srcPath.indexOf('app.js') < 0) {
                        copyFile(srcPath, tarPath, checkEnd);
                    }
                }
            });
        });

        //为空时直接回调
        files.length === 0 && cb && cb();
    });
}

/**
 * 删除目录
 * @param dir
 * @param callback
 */
function rmdir (dir, callback) {
    fs.readdir(dir, (err, files) => {
        /**
         * @desc 内部循环遍历使用的工具函数
         * @param {Number} index 表示读取files的下标
         */
        function next(index) {
            // 如果index 等于当前files的时候说明循环遍历已经完毕，可以删除dir，并且调用callback
            if (files && index === files.length) return fs.rmdir(dir, callback)
            // 如果文件还没有遍历结束的话，继续拼接新路径，使用fs.stat读取该路径
            let newPath = path.join(dir, files[index])
            // 读取文件，判断是文件还是文件目录
            fs.stat(newPath, (err, stat) => {
                if (stat.isDirectory() ) {
                    // 因为我们这里是深度循环，也就是说遍历玩files[index]的目录以后，才会去遍历files[index+1]
                    // 所以在这里直接继续调用rmdir，然后把循环下一个文件的调用放在当前调用的callback中
                    rmdir(newPath, () => next(index+1))
                } else {
                    // 如果是文件，则直接删除该文件，然后在回调函数中调用遍历nextf方法，并且index+1传进去
                    fs.unlink(newPath, () => next(index+1))
                }
            })
        }
        files && next(0)
    })
}
// copyDir(path.join(__dirname, './'), '.')

/**
 * 读取用户输入信息
 */
function readUserSel() {
    process.stdin.setEncoding('utf8');
    process.stdout.write('请输入项目名称：');
    process.stdin.on('data',(dir)=> {
        prjectName = dir.toString().trim();
        console.log(prjectName)
        if (prjectName) {
            fs.mkdir(`./${prjectName}`, function (error) {
                if (error) {
                    console.log('目录创建失败：'+error)
                    process.exit(0);
                }
                console.log('目录创建成功')
                copyDir(path.join(__dirname, './'), `./${prjectName}`)
            })
        } else {
            process.stdout.write('您没有输入项目名称，是否在当前目录下创建项目模板？[Y/N]');
            if (['Y', 'y', 'YES', 'yes'].indexOf(input) > -1) {
                copyDir(path.join(__dirname, './'), `./${prjectName}`)
                process.exit(0);
            }
            if (['N', 'n', 'NO', 'no'].indexOf(input) > -1) {
                process.exit(0);
            }
        }
    })
}
readUserSel()
