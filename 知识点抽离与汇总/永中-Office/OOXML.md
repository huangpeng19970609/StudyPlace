

### 1 前言

阅读资料

Office (2007) Open XML 文件格式简介： http://172.18.21.6:8090/pages/viewpage.action?pageId=61671052&preview=/61671052/61671060/OpenXML%E6%96%87%E4%BB%B6%E6%A0%BC%E5%BC%8F%E7%AE%80%E4%BB%8B.docx

1. Mic2000二进制，不利于传递与使用，如二进制版本容易损坏（使用其他office应用程序打开它时）。

2. office Open xml，以xml（拓展标记语言）+ZIP（工业压缩格式容器）

   - 部件组成文件的内容，额外的关系部件指定部件关系。
   - rels: 定义包中的根关系，解析包每次解析首先解析此文件。

3. 结构

   ```js
   ├── [Content_Types].xml (组件描述文件) 
   ├── _rels (包的关联组件)
   ├── docProps (文档的属性) （Document Properites）
   │   ├── app.xml
   │   ├── core.xml
   │   └── custom.xml
   └── xl 
       ├── _rels (工作簿组件的关联组件)
       │   └── workbook.xml.rels
       ├── charts (图表组件的目录)
       │   ├── _rels (图表组件的关联组件目录)
       │   │   ├── chart1.xml.rels (图表组件的关联组件)
       │   │   └── chart2.xml.rels
       │   ├── chart1.xml (表格组件)
       │   ├── chart2.xml (表格组件)
       │   ├── colors1.xml (颜色组件)
       │   ├── colors2.xml (颜色组件)
       │   ├── style1.xml (样式组件)
       │   └── style2.xml (样式组件)
       ├── drawings (绘图组件的目录)
       │   ├── _rels (绘图组件的关联组件目录)
       │   │   └── drawing1.xml.rels (绘图组件的关联组件)
       │   └── drawing1.xml
       ├── media (多媒体文件目录)
       │   └── image1.png
       ├── sharedStrings.xml (共享字符串组件)
       ├── styles.xml (样式组件)
       ├── tables (表格组件的目录)
       │   └── table1.xml (表格组件)
       ├── theme (主题组件的目录)
       │   └── theme1.xml (主题组件)
       ├── workbook.xml (工作簿组件)
       └── worksheets (工作表组件的目录)
           ├── _rels (工作表组件的关联组件目录)
           │   └── sheet1.xml.rels (工作表组件的关联组件)
           └── sheet1.xml (工作表组件)
   ```

注： 这种目录结构的逻辑关系以xml为基础，故我们应该明白何为xml？xml又是怎么样变成了OOXML

### 2 表格文档的组织形式

表格文档的三处核心

1. Content Types 

   [Content_Types].xml 文件

   包中组件的所有内容类型的列表。

2. 主要内容(worksheet) -> xl目录下的表格

   - 工作表组件的关联组件目录下工作表组件的关联组件
   - 工作表组件

3. 关联(Relationships)

   目的：解耦

   工作簿(workbook.xml)通过工作簿的关联组件(xl/_rel/workbook.xml.rels)来获取需要的工作表(xl/worksheets/sheet)组件

### 3 XML

> 参考文档：https://www.runoob.com/xml/xml-tutorial.html
>
> - 什么是xml？
> - 为什么xml要写成这样子？
> - XML命名空间
> - xmlns与前缀

1. 初识

   1. XML 的设计宗旨是*传输数据*，虽与html同时*标记语言*，但其完全不同，只是语法相似。
      - 故是无行为
      - 故是纯文本
   2. 现代浏览器内置了读取、操作XML的XML解析器， 故你可以使用浏览器打开xml文件（xml_dom）

2. 名词

   - XML 元素

     XML的命名规则： <span style="color: red;">可使用任何名称，没有保留的字词。</span>

   - XML树结构

   - XML语法（关闭标签、大小写敏感、根元素、属性值）

     注意： < 作为字符串时应转义 如 【&lt;】Lt代表它， 我们称呼其为【实体引用】

   - XML属性

     属性描述数据的额外信息（元素的额外信息）

     建议： 避免属性、使用子元素

   - XML验证

     通过 DTD 验证的 XML 是“合法”的 XML。

     - DOCTYPE 声明是对外部 DTD 文件的引用
     - DTD作用是定义XML数据结构，不过DTD也已经落后了，XML SCheme代替了DTD。

     ```xml
     <?xml version="1.0" encoding="ISO-8859-1"?>
     <!DOCTYPE note SYSTEM "Note.dtd">
     <note>
     <to>George</to>
     <from>John</from>
     <heading>Reminder</heading>
     <body>Don't forget the meeting!</body>
     </note>  
     ```

3. XML命名空间

   - 冲突

     XML的名称由开发者定义，当两个文档被一起使用，但其包含不同定义的元素时候，会有命名冲突的问题。

     你可以使用【前缀】来区分不同类型的同名称的元素，如table

     ```js
     <h:table> 和 <f:table>
     ```

   - 使用命名空间

     xmlns:h 赋予了一个h的限定名称，现在它与【http://www.w3.org/TR/html4/】关联起来了

     命名空间与前缀"h"关联

     ```xml
     <h:table xmlns:h="http://www.w3.org/TR/html4/">
        <h:tr>
        <h:td>Apples</h:td>
        <h:td>Bananas</h:td>
        </h:tr>
     </h:table>
     ```

   - 默认命名空间

     默认所在子元素都可以省略其对应的前缀。

     ```xml
     <table xmlns="http://www.w3school.com.cn/furniture">
        <name>African Coffee Table</name>
        <width>80</width>
        <length>120</length>
     </table>
     ```

### 4 XML Scheme

暂略

- **XML Schema 是基于 XML 的 DTD 替代者。**
- **XML Schema 描述 XML 文档的结构。**

### 5 OOXML

Office Open XML

- **压缩文件**   

  Open XML 格式使用 zip 

- **改进了损坏文件的恢复功能**   

  文件采用模块式【结构】，不同数据组件彼此分开。一部分损坏，也不影响总体的打开。

- **支持高级功能更好的隐私政策**

  本文的许多高级功能 Microsoft 365 文档以 Open XML 格式存储。 对于两 [个示例，"](https://support.microsoft.com/zh-cn/office/什么是自动保存-6d6bd723-ebfd-4e40-b5f6-ae6e8088f7a5)自动保存"和 ["](https://support.microsoft.com/zh-cn/office/使用辅助功能检查器改善辅助功能-a16f6de0-2f39-4a2b-8bd8-5ad801426c7f)辅助功能检查器"等功能只能处理以新式 Open XML 格式存储的文件。（因为他们基于xml与模块文件结构化）。

  文档可以保密共享

- **更容易判断文档是否包含宏**   使用默认"x"后缀保存的文件 (例如 .docx、.xlsx 和 .pptx) 不能包含 Visual Basic for Applications (VBA) 宏和 XLM 宏。 只有文件扩展名以"m"结尾的文件 (例如 .docm、.xlsm 和 .pptm) 可以包含宏。

> XML 没有预定义的标签
>
> 参考文档: https://www.w3school.com.cn/xml/xml_elements.asp

1. 一个doc的文档的示范	

   ```xml
   <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
   <document 
   xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" xmlns:a14="http://schemas.microsoft.com/office/drawing/2010/main" mc:Ignorable="w14 w15">
     <body>
       <p>
         <r>
           <t>1231萨达萨达是2312312</t>
         </r>
         <bookmarkStart w:id="0" w:name="_GoBack"/>
         <bookmarkEnd w:id="0"/>
       </p>
       <sectPr>
         <pgSz w:w="11906" w:h="16838"/>
         <pgMar w:top="1440" w:right="1800" w:bottom="1440" w:left="1800" w:header="851" w:footer="992" w:gutter="0"/>
         <docGrid w:type="lines" w:linePitch="312" w:charSpace="0"/>
       </sectPr>
     </body>
   </document>
   ```

### 6 word

> 参考文档： https://docs.microsoft.com/zh-cn/office/open-xml/working-with-paragraphs

#### 00 | **WordProcessingML**

1. 一些重要的 **WordprocessingML** 元素

   | **包部分** | **WordprocessingML 元素** | **Open XML SDK 2.5 类**                                      | **说明**                 |
   | :--------- | :------------------------ | :----------------------------------------------------------- | :----------------------- |
   | 主文档     | document                  | [Document](https://msdn.microsoft.com/library/office/documentformat.openxml.wordprocessing.document.aspx) | 主文档部分的根元素。     |
   | 评论       | comments                  | [Comments](https://msdn.microsoft.com/library/office/documentformat.openxml.wordprocessing.comments.aspx) | 批注部分的根元素。       |
   | 文档设置   | settings                  | [Settings](https://msdn.microsoft.com/library/office/documentformat.openxml.wordprocessing.settings.aspx) | 文档设置部分的根元素。   |
   | 尾注       | endnotes                  | [Endnotes](https://msdn.microsoft.com/library/office/documentformat.openxml.wordprocessing.endnotes.aspx) | 尾注部分的根元素。       |
   | 页脚       | ftr                       | [Footer](https://msdn.microsoft.com/library/office/documentformat.openxml.wordprocessing.footer.aspx) | 页脚部分的根元素。       |
   | 脚注       | footnotes                 | [Footnotes](https://msdn.microsoft.com/library/office/documentformat.openxml.wordprocessing.footnotes.aspx) | 脚注部分的根元素。       |
   | 词汇表文档 | glossaryDocument          | [GlossaryDocument](https://msdn.microsoft.com/library/office/documentformat.openxml.wordprocessing.glossarydocument.aspx) | 术语表文档部分的根元素。 |
   | 标头       | hdr                       | [Header](https://msdn.microsoft.com/library/office/documentformat.openxml.wordprocessing.header.aspx) | 页眉部分的根元素。       |
   | 样式定义   | styles                    | [Styles](https://msdn.microsoft.com/library/office/documentformat.openxml.wordprocessing.styles.aspx) | 样式定义部分的根元素。   |

2.  最小文档方案（即一个WML至少包括了什么）

   由 <**document**> 和 <**body**>元素组成（可见上述代码【一个doc的文档的示范】）

   body下，

   其常见的子元素有p(paragraph)，

   其下再有多个r （run：共同属性的文本区域【格式设置相同的区域】），

   run下包含一个或多个t元素（t代表的是文本范围，也就是文本容器）

3. 

#### 00 | 其他

1. document

   主文档部件的根元素

2. body

   块级结构, 段落、表格、批注的容器

3. 样式 ID、样式名称和别名

   - ⭐ 样式 ID 由文档用于引用样式，可被视为其主要标识符。样式 ID 标识代码中的样式。

     样式元素 styleId 属性定义样式的主内部标识符，比如示范中的【OverdueAmountChar】

   - 样式还可具有在用户界面中显示的单独的显示名称

     如： 名称元素指定主要样式名称，即通常显示在应用程序的用户界面中的名称

   - 别名指定可在应用程序的用户界面中使用的其他样式名称

     别名元素指定两个其他样式名称（如示范中的Late Due 和 Late Amount），以逗号分隔

   ```xml
       <w:style w:type="character" w:styleId="OverdueAmountChar" . . .
         <w:aliases w:val="Late Due, Late Amount" />
         <w:name w:val="Overdue Amount Char" />
       . . .
       </w:style>
   ```

4. 样式类型

   Heading1是我们常用的【标题一】

   此外： 可通过在样式元素的类型属性中指定相应的值来设置段落、字符、表和编号样式类型。

   ```xml
       <w:style w:type="paragraph" w:styleId="Heading1">
         <w:name w:val="heading 1"/>
         <w:basedOn w:val="Normal"/>
         <w:next w:val="Normal"/>
         <w:link w:val="Heading1Char"/>
         <w:uiPriority w:val="1"/>
         <w:qformat/>
         <w:rsid w:val="00F303CE"/>
         …
       </w:style>
   ```

#### 01 | 段落

- p 段落 (**Paragraph** )

  1. 块级结构 (如段落【p】、表格、批注的容器)

- pPr: 段落的属性通过 <pPr> 元素指定 

  1. ParagraphProperties 

     对齐方式、边框、断字覆盖、缩进、行距、底纹、文本方向和孤行控制

  2. 此元素比较抽象，举例

     作用：

     - 属性之间是指定要应用到段落的样式的 **pStyle** 元素

     ```xml
     <w:p  xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
       <w:pPr>
         <w:pStyle w:val="OverdueAmount" />
       </w:pPr>
     </w:p>
     ```

- r 运行

  1. run (<**r**>) 元素用于为文本区域提供界限
  2. 一段连续文本

- t 文本

  1. 对于 <**r**> 元素，text (<**t**>) 元素是组成文档内容的文本的容器
  2. 文本范围

